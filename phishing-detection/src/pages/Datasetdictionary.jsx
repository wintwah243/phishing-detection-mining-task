import React, { useState, useMemo } from "react";
import { Search, ArrowLeft, Hash, ToggleLeft, Tag, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const c = {
  void: "#0B0F14",
  panel: "#121821",
  panel2: "#161D28",
  border: "#212B37",
  ink: "#E7E9EC",
  muted: "#8593A2",
  mutedDim: "#57636F",
  alert: "#FF6B4A",
  safe: "#3ECF8E",
  data: "#FFC857",
};

const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
:root { color-scheme: dark; }
.font-display { font-family: 'Fraunces', serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }
.font-body { font-family: 'Inter', sans-serif; }
.bg-void { background-color: ${c.void}; }
.bg-panel { background-color: ${c.panel}; }
.bg-panel2 { background-color: ${c.panel2}; }
.border-hair { border-color: ${c.border}; }
.text-ink { color: ${c.ink}; }
.text-muted { color: ${c.muted}; }
.text-mutedDim { color: ${c.mutedDim}; }
.text-alert { color: ${c.alert}; }
.text-safe { color: ${c.safe}; }
.text-data { color: ${c.data}; }
.bg-alert-10 { background-color: rgba(255,107,74,0.10); }
.bg-safe-10 { background-color: rgba(62,207,142,0.10); }
.bg-data-10 { background-color: rgba(255,200,87,0.10); }
a { text-decoration: none; }
.scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 4px; }
`;

const CATEGORIES = [
  { key: "lexical", label: "Lexical", tone: "data" },
  { key: "host", label: "Host-based", tone: "alert" },
  { key: "content", label: "Content-based", tone: "safe" },
  { key: "target", label: "Target", tone: "ink" },
];

const COLUMNS = [
  { name: "qty_dot_url", type: "Numeric", cat: "lexical", def: "Total number of dot(.) in the full URL string." },
  { name: "qty_hyphen_url", type: "Numeric", cat: "lexical", def: "Total number of hyphen(-) in the full URL string." },
  { name: "qty_underline_url", type: "Numeric", cat: "lexical", def: "Total number of underline(_) in the full URL string." },
  { name: "qty_slash_url", type: "Numeric", cat: "lexical", def: "Total number of slash(/) in the full URL string." },
  { name: "qty_questionmark_url", type: "Numeric", cat: "lexical", def: "Total number of question mark(?) in the full URL string." },
  { name: "qty_equal_url", type: "Numeric", cat: "lexical", def: "Total number of equal(=) in the full URL string." },
  { name: "qty_at_url", type: "Numeric", cat: "lexical", def: "Total number of at(@) in the full URL string." },
  { name: "qty_and_url", type: "Numeric", cat: "lexical", def: "Total number of and(&) in the full URL string." },
  { name: "qty_exclamation_url", type: "Numeric", cat: "lexical", def: "Total number of exclamation(!) in the full URL string." },
  { name: "qty_space_url", type: "Numeric", cat: "lexical", def: "Total number of space(%20%20) in the full URL string." },
  { name: "qty_tilde_url", type: "Numeric", cat: "lexical", def: "Total number of tilde(~) in the full URL string." },
  { name: "qty_comma_url", type: "Numeric", cat: "lexical", def: "Total number of comma(,) in the full URL string." },
  { name: "qty_plus_url", type: "Numeric", cat: "lexical", def: "Total number of plus(+) in the full URL string." },
  { name: "qty_asterisk_url", type: "Numeric", cat: "lexical", def: "Total number of asterisk(*) in the full URL string." },
  { name: "qty_dollar_url", type: "Numeric", cat: "lexical", def: "Total number of dollar sign($) in the full URL string." },
  { name: "qty_percent_url", type: "Numeric", cat: "lexical", def: "Total number of percent(%) in the full URL string." },
  { name: "qty_tld_url", type: "Numeric", cat: "lexical", def: "Total number of Top-Level Domains (TLDs) in the full URL string. It counts how many times a valid top-level domain extension (like .com, .org, .net, .biz, or country codes like .cc, .ru, .my) appears anywhere across the entire URL string." },
  { name: "length_url", type: "Numeric", cat: "lexical", def: "Length of the URL. It is a discrete numeric feature that counts the total number of characters in the entire URL string, including the protocol (http:// or https://), the domain, the path, and any query parameters." },
  { name: "qty_dot_domain", type: "Numeric", cat: "lexical", def: "It counts the number of dot characters (.) present strictly within the domain name portion of the URL, completely ignoring any dots found in the protocol (https://) or the trailing URL path/query string. for example: google.com" },
  { name: "qty_hyphen_domain", type: "Numeric", cat: "lexical", def: "It counts the number of hyphen (-) present strictly within the domain name portion of the URL, completely ignoring any dots found in the protocol (https://) or the trailing URL path/query string. " },
  { name: "qty_underline_domain", type: "Numeric", cat: "lexical", def: "It counts the number of underline (_) present strictly within the domain name portion of the URL, completely ignoring any dots found in the protocol (https://) or the trailing URL path/query string." },
  { name: "qty_vowels_domain", type: "Numeric", cat: "lexical", def: "It counts the total number of vowel characters (a, e, i, o, u — both lowercase and uppercase) present strictly within the domain name portion of the URL. Because Many modern phishing campaigns and malware networks use Domain Generation Algorithms. Randomly generated strings often look like gibberish (e.g., xzrtplkfjw.cc)" },
  { name: "domain_length", type: "Numeric", cat: "lexical", def: "Length of the domain portion of the URL." },
  { name: "domain_in_ip", type: "Binary", cat: "host", def: "It is a binary/boolean feature (taking a value of either 1 or 0) that checks whether the URL bypasses a human-readable domain name entirely and uses a raw, numerical IP address to identify the server hosting the website instead. domain_in_ip = 0 (False): The URL uses a standard, readable domain name. domain_in_ip = 1 (True): The URL uses a raw IPv4 or IPv6 network address. (Example (IPv4): http://192.168.1.1/login.html)" },
  { name: "server_client_domain", type: "Binary", cat: "host", def: "It is a feature (evaluating to either 1 or 0) that checks whether the keywords server or client are explicitly written out inside the domain name portion of the URL. server_client_domain = 0 (False): Neither keyword appears in the isolated domain string. server_client_domain = 1 (True): The word server or client is present in the domain name or subdomains. (Example: http://www.paypal.com.login-server-verify.cc/)" },
  { name: "qty_dot_directory", type: "Numeric", cat: "lexical", def: "It counts the number of dot (.) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_hyphen_directory", type: "Numeric", cat: "lexical", def: "It counts the number of hyphen (-) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_underline_directory", type: "Numeric", cat: "lexical", def: "It counts the number of underline(_) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_slash_directory", type: "Numeric", cat: "lexical", def: "It counts the number of slash(/) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_questionmark_directory", type: "Numeric", cat: "lexical", def: "It counts the number of question mark(?) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_equal_directory", type: "Numeric", cat: "lexical", def: "It counts the number of equal(=) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_at_directory", type: "Numeric", cat: "lexical", def: "It counts the number of at(@) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_and_directory", type: "Numeric", cat: "lexical", def: "It counts the number of and(&) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_exclamation_directory", type: "Numeric", cat: "lexical", def: "It counts the number of exclamation(!) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_space_directory", type: "Numeric", cat: "lexical", def: "It counts the number of space(%20%20%) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_tilde_directory", type: "Numeric", cat: "lexical", def: "It counts the number of tilde(~) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_comma_directory", type: "Numeric", cat: "lexical", def: "It counts the number of comma(,) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_plus_directory", type: "Numeric", cat: "lexical", def: "It counts the number of plus(+) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_asterisk_directory", type: "Numeric", cat: "lexical", def: "It counts the number of asterisk(*) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_hashtag_directory", type: "Numeric", cat: "lexical", def: "It counts the number of hashtag(#) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_dollar_directory", type: "Numeric", cat: "lexical", def: "It counts the number of dollar($) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "qty_percent_directory", type: "Numeric", cat: "lexical", def: "It counts the number of percent(%) present strictly within the directory portion(behind domain portion) of the URL." },
  { name: "directory_length", type: "Numeric", cat: "lexical", def: "Length of the directory portion of the URL." },
  { name: "qty_dot_file", type: "Numeric", cat: "lexical", def: "It counts the number of dot(.) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_hyphen_file", type: "Numeric", cat: "lexical", def: "It counts the number of hyphen(-) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_underline_file", type: "Numeric", cat: "lexical", def: "It counts the number of underline(_) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_slash_file", type: "Numeric", cat: "lexical", def: "It counts the number of slash(/) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_questionmark_file", type: "Numeric", cat: "lexical", def: "It counts the number of question mark (?) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_equal_file", type: "Numeric", cat: "lexical", def: "It counts the number of equal(=) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_at_file", type: "Numeric", cat: "lexical", def: "It counts the number of at(@) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_and_file", type: "Numeric", cat: "lexical", def: "It counts the number of and(&) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_exclamation_file", type: "Numeric", cat: "lexical", def: "It counts the number of exclamation(!) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_space_file", type: "Numeric", cat: "lexical", def: "It counts the number of space(%20%20%) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_tilde_file", type: "Numeric", cat: "lexical", def: "It counts the number of tilde(~) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_comma_file", type: "Numeric", cat: "lexical", def: "It counts the number of comma(,) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_plus_file", type: "Numeric", cat: "lexical", def: "It counts the number of plus(+) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_asterisk_file", type: "Numeric", cat: "lexical", def: "It counts the number of asterisk(*) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_hashtag_file", type: "Numeric", cat: "lexical", def: "It counts the number of hashtag(#) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_dollar_file", type: "Numeric", cat: "lexical", def: "It counts the number of dollar($) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "qty_percent_file", type: "Numeric", cat: "lexical", def: "It counts the number of percent(%) present strictly within the file portion(behind directory portion) of the URL." },
  { name: "file_length", type: "Numeric", cat: "lexical", def: "Length of the file extension portion of the URL." },
  { name: "email_in_url", type: "Binary", cat: "lexical", def: "Email Address Presence in the URL. It is a binary/boolean feature (taking a value of either 1 or 0) that scans the entire URL string to detect whether a complete email address pattern (like user@example.com or its URL-encoded equivalent user%40example.com) is embedded anywhere inside it." },
  { name: "time_response", type: "Numeric", cat: "host", def: "Time_response measures the exact amount of time (usually in milliseconds) it takes for the hosting server to respond to a network request (ping or HTTP GET). Because this metric depends entirely on the physical server's location, network bandwidth, and hardware performance, it is a classic host-based networking feature." },
  { name: "domain_spf", type: "Binary", cat: "host", def: "Domain Sender Policy Framework (SPF) Record Presence. It is a binary/boolean feature (evaluating to either 1 or 0) that checks whether the domain has configured an SPF record to secure its outgoing mail setup." },
  { name: "asn_ip", type: "Numeric", cat: "host", def: "Autonomous System Number associated with the IP address. asn_ip tells the machine learning model which company or internet provider owns the physical network where the website is hosted. Think of it like an international ID number for a web network. If a website claims to be a secure login page and its asn_ip points to a trusted giant like Microsoft, Google, or Cloudflare, the model sees it as a normal, safe setup." },
  { name: "time_domain_activation", type: "Numeric", cat: "host", def: "Domain Activation Time. This feature calculates the total age of the domain name. Example: Phishing campaigns are highly reactive. Attackers register a domain, launch an email blast, harvest credentials for a few days, and then discard the domain once web browsers and security vendors flag it as malicious. Because of this high turnover rate, a phishing website almost always has a time_domain_activation value of only a few days or weeks." },
  { name: "time_domain_expiration", type: "Numeric", cat: "host", def: "Domain Expiration Time. This feature calculates the remaining lifespan of the domain registration. Example-Cybercriminals look at domain registrations as operational expenses. Because phishing campaigns are short-lived, attackers manage their budgets tightly, creating distinct patterns that machine learning models easily spot." },
  { name: "qty_ip_resolved", type: "Numeric", cat: "host", def: "Quantity of Resolved IP Addresses. Massive platforms like Google, Facebook, or major international banks handle millions of visitors simultaneously. To prevent their systems from crashing, they use a technique called DNS Round Robin or global load balancing. When a DNS query is made, it returns a list of multiple IP addresses (e.g., qty_ip_resolved = 4, 6, or 8) so the traffic can be split across different data centers. Phishing operations are usually small-scale, hasty setups. An attacker spinning up a rapid credential-harvesting site or hosting a phishing kit on a single compromised server will only map their domain to one specific IP address (qty_ip_resolved = 1)." },
  { name: "qty_nameservers", type: "Numeric", cat: "host", def: "Quantity of Nameservers. Nameservers are the digital phonebooks of the internet. When you type a domain like example.com into your browser, the authoritative nameservers are the specific servers responsible for giving your computer the actual IP address of the website. Legitimate businesses, financial institutions, and enterprise tech companies typically have 3, 4, or more nameservers assigned to their domain. Many disposable phishing setups rely on the absolute bare minimum configuration required to make the website resolve on the internet—often utilizing just 1 or 2 nameservers provided by a cheap, unverified registrar." },
  { name: "qty_mx_servers", type: "Numeric", cat: "host", def: "Quantity of Mail Exchanger (MX) Servers. A Mail Exchanger (MX) record is a setting in a domain's DNS configuration that specifies the mail servers responsible for accepting email messages on behalf of the domain name. Legitimate companies rely heavily on communication. If a corporate mail server goes down, it can cause massive financial or operational disruptions. To prevent this, established brands configure multiple MX servers with different priority levels." },
  { name: "ttl_hostname", type: "Numeric", cat: "host", def: "Time-to-Live of the Hostname. Time-to-Live (TTL) is a setting inside a DNS record (measured in seconds) that tells internet routers, internet service providers (ISPs), and web browsers exactly how long they are allowed to cache (remember) the website's IP address before they must drop it and ask the authoritative nameserver for a fresh update. Phishing Networks (Ultra-Low TTL<e.g., 60 to 300 seconds / 1 to 5 minutes>) and Corporate Stability and Caching Efficiency (High TTL<e.g., 86400 seconds / 24 hours>)" },
  { name: "tls_ssl_certificate", type: "Binary", cat: "host", def: "TLS/SSL Certificate Presence and Validity. It checks whether the website successfully provides a valid, trusted, and unexpired security certificate to establish an encrypted HTTPS connection. If tls_ssl_certificate = 1 (True): The website has a valid, properly configured TLS/SSL certificate issued by a recognized Certificate Authority." },
  { name: "qty_redirects", type: "Numeric", cat: "host", def: "Quantity of Redirects. It tracks the active network behavior of a URL. To calculate this metric, the system must simulate a browser request to the link and count how many times the server forces the browser to jump from one URL path to another before finally landing on the destination page. qty_redirects = 0 or 1: Normal baseline. Most regular browsing experiences involve direct connections or a single seamless protocol hop (e.g., routing to the secure https version of a domain). qty_redirects >= 3: Highly Suspicious." },
  { name: "url_google_index", type: "Binary", cat: "host", def: "Google Search Index Availability Status. It checks if the specific URL or its parent domain has been crawled and indexed by Google Search. Eg;url_google_index = 1 (True): The URL or its domain is actively present in Google's search index." },
  { name: "domain_google_index", type: "Binary", cat: "host", def: "Domain Presence in Google Search Index. It Checks the entire root domain (e.g., hacked-site.com), completely ignoring whatever folders or sub-pages come after it. " },
  { name: "url_shortened", type: "Binary", cat: "lexical", def: "URL Shortener Service Detection. Eg: url_shortened = 1 (True): Increases Suspicion. url_shortened = 0 (False): Standard baseline for direct navigation links." },
];

const typeIcon = { Numeric: Hash, Binary: ToggleLeft, Categorical: Tag };

export default function DatasetDictionary() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COLUMNS.filter((col) => {
      const matchesCat = activeCat === "all" || col.cat === activeCat;
      const matchesQuery =
        !q || col.name.toLowerCase().includes(q) || col.def.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  const grouped = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      ...cat,
      rows: filtered.filter((r) => r.cat === cat.key),
    })).filter((g) => g.rows.length > 0);
  }, [filtered]);

  const toneText = (tone) =>
    tone === "alert" ? "text-alert" : tone === "safe" ? "text-safe" : tone === "data" ? "text-data" : "text-ink";
  const toneBg = (tone) =>
    tone === "alert" ? "bg-alert-10" : tone === "safe" ? "bg-safe-10" : tone === "data" ? "bg-data-10" : "bg-panel2";

  return (
    <div className="bg-void min-h-screen font-body">
      <style>{globalCss}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-hair"
        style={{ backgroundColor: "rgba(11,15,20,0.9)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5">
            <Link to="/" className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors w-fit mb-4">
                <ArrowLeft size={13} /> Back to home
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-2">
                Data Dictionary
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">
                Every column, defined.
              </h1>
            </div>
            <div className="font-mono text-xs text-muted border border-hair rounded-full px-3.5 py-1.5">
              {COLUMNS.length} columns documented
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <p className="font-body text-sm text-muted max-w-xl mb-8 leading-relaxed">
          The dataset behind this project has {COLUMNS.length}+ columns, and it's easy to
          lose track of what each one means. This page is the reference — search
          by name or keyword, or filter by feature category.
        </p>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sticky top-[6.5rem] z-40 bg-void py-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mutedDim"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a column name or keyword…"
              className="w-full font-mono text-sm bg-panel border border-hair rounded-md py-2.5 pl-10 pr-4 text-ink placeholder:text-mutedDim outline-none focus:border-mutedDim transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            <button
              onClick={() => setActiveCat("all")}
              className={`shrink-0 font-mono text-xs px-3.5 py-2 rounded-md border transition-colors ${
                activeCat === "all"
                  ? "border-mutedDim text-ink bg-panel2"
                  : "border-hair text-muted hover:text-ink"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCat(cat.key)}
                className={`shrink-0 font-mono text-xs px-3.5 py-2 rounded-md border transition-colors ${
                  activeCat === cat.key
                    ? `border-mutedDim ${toneText(cat.tone)} bg-panel2`
                    : "border-hair text-muted hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {grouped.length === 0 ? (
          <div className="border border-hair rounded-lg p-10 text-center">
            <p className="font-body text-sm text-muted">
              No columns match "{query}". Try a different keyword.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {grouped.map((group) => (
              <div key={group.key}>
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={14} className={toneText(group.tone)} />
                  <h2 className={`font-mono text-xs uppercase tracking-wider ${toneText(group.tone)}`}>
                    {group.label}
                  </h2>
                  <span className="font-mono text-xs text-mutedDim">({group.rows.length})</span>
                </div>

                <div className="border border-hair rounded-lg overflow-hidden bg-panel divide-y divide-hair" style={{ borderColor: c.border }}>
                  {group.rows.map((col, i) => {
                    const Icon = typeIcon[col.type] || Tag;
                    return (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 px-5 py-4"
                        style={{ borderColor: c.border }}
                      >
                        <div className="sm:w-56 shrink-0 flex items-start gap-2">
                          <code className="font-mono text-sm text-ink break-all">{col.name}</code>
                        </div>
                        <div className="sm:w-28 shrink-0">
                          <span
                            className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded ${toneBg(
                              group.tone
                            )} ${toneText(group.tone)}`}
                          >
                            <Icon size={11} />
                            {col.type}
                          </span>
                        </div>
                        <p className="font-body text-sm text-muted leading-relaxed flex-1">
                          {col.def}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">
          Data & Knowledge Mining · University of Computer Studies, Yangon · 2026
        </p>
      </footer>
    </div>
  );
}