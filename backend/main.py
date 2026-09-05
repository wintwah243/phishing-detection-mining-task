from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import re
from urllib.parse import urlparse

app = FastAPI()

# React Frontend မှ ခေါ်ယူခွင့်ပေးရန် CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production ရောက်ရင် React URL (eg. http://localhost:5173) ပြောင်းပေးပါ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Saved Model, Scaler & Feature Names များကို Load လုပ်ခြင်း
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
feature_names = joblib.load('feature_names.pkl')


class URLRequest(BaseModel):
    url: str


# Colab ထဲက Feature Extraction function
def extract_url_features(url: str):
    url = url.strip()
    if url.startswith('[') and '](' in url:
        url = url.split('](', 1)[1]
        if url.endswith(')'):
            url = url[:-1]
    url = url.strip()
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url

    parsed = urlparse(url)
    full_url = url
    domain = parsed.netloc.split(':')[0]

    features = {}
    features['qty_dot_url'] = full_url.count('.')
    features['qty_hyphen_url'] = full_url.count('-')
    features['qty_underline_url'] = full_url.count('_')
    features['qty_slash_url'] = full_url.count('/')
    features['qty_questionmark_url'] = full_url.count('?')
    features['qty_equal_url'] = full_url.count('=')
    features['qty_at_url'] = full_url.count('@')
    features['qty_and_url'] = full_url.count('&')
    features['qty_exclamation_url'] = full_url.count('!')
    features['qty_space_url'] = full_url.count(' ')
    features['qty_tilde_url'] = full_url.count('~')
    features['qty_comma_url'] = full_url.count(',')
    features['qty_plus_url'] = full_url.count('+')
    features['qty_asterisk_url'] = full_url.count('*')
    features['qty_hashtag_url'] = full_url.count('#')
    features['qty_dollar_url'] = full_url.count('$')
    features['qty_percent_url'] = full_url.count('%')
    features['length_url'] = len(full_url)

    features['qty_dot_domain'] = domain.count('.')
    features['qty_hyphen_domain'] = domain.count('-')
    features['qty_underline_domain'] = domain.count('_')
    features['qty_slash_domain'] = domain.count('/')
    features['qty_questionmark_domain'] = domain.count('?')
    features['qty_equal_domain'] = domain.count('=')
    features['qty_at_domain'] = domain.count('@')
    features['qty_and_domain'] = domain.count('&')
    features['qty_exclamation_domain'] = domain.count('!')
    features['qty_space_domain'] = domain.count(' ')
    features['qty_tilde_domain'] = domain.count('~')
    features['qty_comma_domain'] = domain.count(',')
    features['qty_plus_domain'] = domain.count('+')
    features['qty_asterisk_domain'] = domain.count('*')
    features['qty_hashtag_domain'] = domain.count('#')
    features['qty_dollar_domain'] = domain.count('$')
    features['qty_percent_domain'] = domain.count('%')

    features['qty_vowels_domain'] = sum(c.lower() in 'aeiou' for c in domain)
    features['domain_length'] = len(domain)

    ip_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    features['domain_in_ip'] = int(bool(re.match(ip_pattern, domain)))
    features['server_client_domain'] = int('server' in domain.lower() or 'client' in domain.lower())
    features['email_in_url'] = int('@' in full_url)
    features['tls_ssl_certificate'] = int(parsed.scheme == 'https')

    shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'ow.ly']
    features['url_shortened'] = int(any(shortener in domain.lower() for shortener in shorteners))

    return features


@app.post("/predict")
def predict_phishing(data: URLRequest):
    try:
        raw_features = extract_url_features(data.url)
        url_df = pd.DataFrame([raw_features])

        # Exact feature ordering
        url_df = url_df[feature_names]

        # Scaling
        url_scaled = scaler.transform(url_df)

        # Prediction
        prediction = int(model.predict(url_scaled)[0])
        probabilities = model.predict_proba(url_scaled)[0]

        return {
            "url": data.url,
            "prediction": prediction,  # 1: Phishing, 0: Legitimate
            "result": "PHISHING" if prediction == 1 else "LEGITIMATE",
            "legitimate_prob": round(float(probabilities[0]) * 100, 2),
            "phishing_prob": round(float(probabilities[1]) * 100, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))