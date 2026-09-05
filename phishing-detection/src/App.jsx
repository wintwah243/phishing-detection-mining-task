import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DatasetDictionary from "./pages/Datasetdictionary";
import Preprocessingintro from "./pages/Preprocessingintro";
import MethodologiesIntro from "./pages/MethodologiesIntro";
import EvaluationIntro from "./pages/EvaluationIntro";
import DelectedColumnsPreprocessing from "./pages/DelectedColumnsPreprocessing";
import HandlingMissingValues from "./pages/HandlingMissingValues";
import DataTransformation from "./pages/DataTransformation";
import FeatureSelection from "./pages/FeatureSelection";
import DataNormalization from "./pages/DataNormalization";
import DataVisualization from "./pages/DataVisualization";
import DescriptiveMining from "./pages/DescriptiveMining";
import AppliedMethodology from "./pages/AppliedMethodology.jsx";
import ModelSetUp from "./pages/ModelSetUp";
import BaselineModel from "./pages/BaselineModel";
import ProposedModel from "./pages/ProposedModel";
import PerformanceMetric from "./pages/PerformanceMetric";
import ModelComparison from "./pages/ModelComparison";
import EvaluationAnalysis from "./pages/EvaluationAnalysis";
import Roccurve from "./pages/Roccurve";
import CrossValidation from "./pages/CrossValidation";
import Finding from "./pages/Finding";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset-dictionary" element={<DatasetDictionary />} />
        <Route path="/preprocessingintro/:id" element={<Preprocessingintro />} />
        <Route path="/preprocessingintro/week-5" element={<MethodologiesIntro />} />
        <Route path="/preprocessingintro/week-8" element={<EvaluationIntro />} />
        <Route path="/preprocessing/deleted-columns" element={<DelectedColumnsPreprocessing />} />
        <Route path="/preprocessing/handlingmissingvalues" element={<HandlingMissingValues />}/>
        <Route path="/preprocessing/datatransformation" element={<DataTransformation />} />
        <Route path="/preprocessing/featureselection" element={<FeatureSelection />} />
        <Route path="/preprocessing/datanormalization" element={<DataNormalization /> }/>
        <Route path="/preprocessing/datavisualization" element={<DataVisualization />} />
        <Route path="/methodologies/descriptivemining" element={<DescriptiveMining />} />
        <Route path="/methodologies/appliedmethodologies" element={<AppliedMethodology />} />
        <Route path="/methodologies/modelsetup" element={<ModelSetUp />} />
        <Route path="/methodologies/baselinemodel" element={<BaselineModel />} />
        <Route path="/methodologies/proposedmodel" element={<ProposedModel />} />
        <Route path="/evaluation/performancemetrics" element={<PerformanceMetric/>} />
        <Route path="/evaluation/modelcomparison" element={<ModelComparison />} />
        <Route path="/evaluation/evaluationanalysis" element={<EvaluationAnalysis />} />
        <Route path="/evaluation/roccurve" element={<Roccurve />} />
         <Route path="/evaluation/crossvalidation" element={<CrossValidation />} />
         <Route path="/evaluation/findings" element={<Finding />} />
      </Routes>
    </Router>
  );
}