"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Upload,
  FileText,
  Brain,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  Zap,
  Shield,
  Key,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AIGovernancePlatform() {
  const [uploadedModel, setUploadedModel] = useState<File | null>(null)
  const [uploadedDataset, setUploadedDataset] = useState<File | null>(null)
  const [sensitiveColumn, setSensitiveColumn] = useState<string>("")
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({})
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [showApiDialog, setShowApiDialog] = useState(false)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [showLifecycleDialog, setShowLifecycleDialog] = useState(false)

  const modelInputRef = useRef<HTMLInputElement>(null)
  const datasetInputRef = useRef<HTMLInputElement>(null)

  const handleApiKeyUpdate = (provider: string, key: string) => {
    setApiKeys((prev) => ({ ...prev, [provider]: key }))
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: currentMessage },
      {
        role: "assistant",
        content:
          "This is a simulated response from your uploaded model. In a real implementation, this would process your input through the uploaded model and dataset.",
      },
    ])
    setCurrentMessage("")
  }

  const handleModelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.name.endsWith(".pkl") || file.name.endsWith(".joblib"))) {
      setUploadedModel(file)
      checkForAnalysis(file, uploadedDataset)
    } else {
      alert("Please upload a valid model file (.pkl or .joblib)")
    }
  }

  const handleDatasetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith(".csv")) {
      setUploadedDataset(file)
      checkForAnalysis(uploadedModel, file)
    } else {
      alert("Please upload a valid CSV file")
    }
  }

  const checkForAnalysis = (modelFile: File | null, datasetFile: File | null) => {
    if (modelFile && datasetFile && sensitiveColumn.trim()) {
      startAnalysis()
    }
  }

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis steps with progress updates
    const steps = [
      { message: "Loading model and dataset...", progress: 20 },
      { message: "Generating predictions...", progress: 40 },
      { message: "Calculating accuracy metrics...", progress: 60 },
      { message: "Analyzing bias and fairness...", progress: 80 },
      { message: "Generating report...", progress: 100 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAnalysisProgress(step.progress)
    }

    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  const mockAnalysisResults = {
    fairnessScore: 6.8,
    transparencyScore: 8.2,
    biasDetected: true,
    riskLevel: "Medium",
    demographicParityDifference: 0.127,
    accuracyMetrics: {
      overall: 0.847,
      precision: 0.823,
      recall: 0.791,
      f1Score: 0.807,
    },
    groupPerformance: {
      male: { accuracy: 0.891, precision: 0.867 },
      female: { accuracy: 0.764, precision: 0.743 },
    },
    recommendations: [
      "Address gender bias in hiring predictions (DPD: 0.127 > 0.1 threshold)",
      "Implement fairness constraints using fairlearn library",
      "Consider re-balancing training data across demographic groups",
      "Add explainability features using SHAP values",
    ],
  }

  const lifecycleStages = [
    {
      stage: "Problem Definition",
      description: "Define the AI problem, objectives, and success metrics",
      tasks: ["Identify business problem", "Define success criteria", "Assess feasibility", "Stakeholder alignment"],
    },
    {
      stage: "Data Collection & Preparation",
      description: "Gather, clean, and prepare data for model training",
      tasks: ["Data sourcing", "Data quality assessment", "Privacy compliance", "Feature engineering"],
    },
    {
      stage: "Model Development",
      description: "Design, train, and validate AI models",
      tasks: ["Algorithm selection", "Model training", "Hyperparameter tuning", "Cross-validation"],
    },
    {
      stage: "Ethics & Bias Testing",
      description: "Evaluate model for fairness, bias, and ethical considerations",
      tasks: ["Bias detection", "Fairness metrics", "Explainability analysis", "Risk assessment"],
    },
    {
      stage: "Deployment & Monitoring",
      description: "Deploy model to production and monitor performance",
      tasks: ["Production deployment", "Performance monitoring", "Drift detection", "Continuous evaluation"],
    },
    {
      stage: "Governance & Compliance",
      description: "Ensure ongoing compliance with regulations and standards",
      tasks: ["Regulatory compliance", "Documentation", "Audit trails", "Stakeholder reporting"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI SAHAYAK</h1>
                <p className="text-sm text-muted-foreground">Cerebrators</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Key className="w-4 h-4 mr-2" />
                    API Keys
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Manage API Keys</DialogTitle>
                    <DialogDescription>
                      Add API keys for closed-source models to enable testing and analysis
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {["OpenAI", "Anthropic", "Google AI", "Cohere"].map((provider) => (
                      <div key={provider} className="space-y-2">
                        <Label htmlFor={provider.toLowerCase()}>{provider}</Label>
                        <Input
                          id={provider.toLowerCase()}
                          type="password"
                          placeholder={`Enter ${provider} API key`}
                          value={apiKeys[provider] || ""}
                          onChange={(e) => handleApiKeyUpdate(provider, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Badge variant="outline" className="text-primary border-primary">
                Beta Platform
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground text-balance">Ethical AI Report Card</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Upload your ML model and dataset to receive comprehensive bias detection, fairness analysis, and
                transparency scoring using scikit-learn and fairlearn libraries.
              </p>
            </div>

            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Your AI Model & Dataset</span>
                </CardTitle>
                <CardDescription>
                  Upload your trained model (.pkl, .joblib) and test dataset (.csv) for real-time bias analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Model Upload */}
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium mb-2">ML Model File</p>
                    <p className="text-xs text-muted-foreground mb-3">Supports .pkl, .joblib formats</p>
                    <input
                      ref={modelInputRef}
                      type="file"
                      accept=".pkl,.joblib"
                      onChange={handleModelUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" onClick={() => modelInputRef.current?.click()}>
                      {uploadedModel ? uploadedModel.name : "Choose Model File"}
                    </Button>
                    {uploadedModel && (
                      <div className="mt-2 flex items-center justify-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">Model Loaded</span>
                      </div>
                    )}
                  </div>

                  {/* Dataset Upload */}
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium mb-2">Test Dataset</p>
                    <p className="text-xs text-muted-foreground mb-3">CSV format with features & labels</p>
                    <input
                      ref={datasetInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleDatasetUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" onClick={() => datasetInputRef.current?.click()}>
                      {uploadedDataset ? uploadedDataset.name : "Choose Dataset File"}
                    </Button>
                    {uploadedDataset && (
                      <div className="mt-2 flex items-center justify-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">Dataset Loaded</span>
                      </div>
                    )}
                  </div>
                </div>

                {uploadedModel && uploadedDataset && (
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="sensitive-column">Sensitive Feature Column</Label>
                      <Input
                        id="sensitive-column"
                        placeholder="e.g., gender, age_group, race"
                        value={sensitiveColumn}
                        onChange={(e) => {
                          setSensitiveColumn(e.target.value)
                          if (e.target.value.trim() && uploadedModel && uploadedDataset) {
                            checkForAnalysis(uploadedModel, uploadedDataset)
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Specify the column name in your dataset that contains the sensitive attribute for bias analysis
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Test Model
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[600px]">
                          <DialogHeader>
                            <DialogTitle>Test Your Model</DialogTitle>
                            <DialogDescription>
                              Chat interface to test your uploaded model with sample inputs
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col h-[400px]">
                            <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg">
                              {chatMessages.length === 0 ? (
                                <p className="text-muted-foreground text-center">
                                  Start a conversation to test your model...
                                </p>
                              ) : (
                                chatMessages.map((msg, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                  >
                                    <div
                                      className={`max-w-[80%] p-3 rounded-lg ${
                                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                      }`}
                                    >
                                      {msg.content}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Input
                                placeholder="Type your test input..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                              />
                              <Button onClick={handleSendMessage} size="sm">
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Running scikit-learn + fairlearn analysis...</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>AI Ethics Report Card</span>
                  </CardTitle>
                  <CardDescription>
                    Analysis results using scikit-learn accuracy metrics and fairlearn bias detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
                      <TabsTrigger value="fairness">Fairness</TabsTrigger>
                      <TabsTrigger value="transparency">Transparency</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-500">
                              {mockAnalysisResults.fairnessScore}/10
                            </div>
                            <p className="text-sm text-muted-foreground">Fairness Score</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-500">
                              {mockAnalysisResults.transparencyScore}/10
                            </div>
                            <p className="text-sm text-muted-foreground">Transparency Score</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <Badge variant="secondary" className="text-yellow-500 border-yellow-500">
                              {mockAnalysisResults.riskLevel} Risk
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-2">Overall Risk</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Bias Detected</AlertTitle>
                        <AlertDescription>
                          Demographic Parity Difference: {mockAnalysisResults.demographicParityDifference} (threshold:
                          0.1). This model shows significant bias against certain demographic groups.
                        </AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="accuracy" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-blue-500">
                              {(mockAnalysisResults.accuracyMetrics.overall * 100).toFixed(1)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Overall Accuracy</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-green-500">
                              {(mockAnalysisResults.accuracyMetrics.precision * 100).toFixed(1)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Precision</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-purple-500">
                              {(mockAnalysisResults.accuracyMetrics.recall * 100).toFixed(1)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Recall</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-orange-500">
                              {(mockAnalysisResults.accuracyMetrics.f1Score * 100).toFixed(1)}%
                            </div>
                            <p className="text-xs text-muted-foreground">F1-Score</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Performance by Group</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                              <span className="font-medium">Male</span>
                              <div className="text-right">
                                <div className="text-sm">
                                  Accuracy: {(mockAnalysisResults.groupPerformance.male.accuracy * 100).toFixed(1)}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Precision: {(mockAnalysisResults.groupPerformance.male.precision * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                              <span className="font-medium">Female</span>
                              <div className="text-right">
                                <div className="text-sm">
                                  Accuracy: {(mockAnalysisResults.groupPerformance.female.accuracy * 100).toFixed(1)}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Precision: {(mockAnalysisResults.groupPerformance.female.precision * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="fairness" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Demographic Parity Analysis</CardTitle>
                          <CardDescription>
                            Fairlearn demographic parity difference: {mockAnalysisResults.demographicParityDifference}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Gender Fairness</span>
                                <span className="text-sm text-red-500">High Bias (DPD: 0.127)</span>
                              </div>
                              <Progress value={27} className="w-full" />
                              <p className="text-xs text-muted-foreground mt-1">
                                Threshold: 0.1 | Current: 0.127 (27% above threshold)
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Selection Rate Parity</span>
                                <span className="text-sm text-yellow-500">Moderate Bias</span>
                              </div>
                              <Progress value={78} className="w-full" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="transparency" className="space-y-4">
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Model Explainability</h4>
                            <p className="text-sm text-muted-foreground">
                              SHAP values successfully generated for feature importance analysis.
                            </p>
                            <div className="mt-2">
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                ✓ Explainable
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Data Lineage</h4>
                            <p className="text-sm text-muted-foreground">
                              Training data sources and preprocessing steps documented.
                            </p>
                            <div className="mt-2">
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                ✓ Traceable
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm">Models Audited</span>
                  </div>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Certified Models</span>
                  </div>
                  <span className="font-semibold">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Issues Detected</span>
                  </div>
                  <span className="font-semibold">355</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => window.open("https://indiaai.gov.in/responsible-ai/homepage", "_blank")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Compliance Guide
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => window.open("https://indiaai.gov.in/articles", "_blank")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community Forum
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>

                <Dialog open={showLifecycleDialog} onOpenChange={setShowLifecycleDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      AI Project Lifecycle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>AI Project Lifecycle for Developers</DialogTitle>
                      <DialogDescription>
                        Complete guide for responsible AI development from conception to deployment
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {lifecycleStages.map((stage, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span>{stage.stage}</span>
                            </CardTitle>
                            <CardDescription>{stage.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {stage.tasks.map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-sm">{task}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="text-center pt-4">
                        <Button
                          onClick={() => window.open("https://indiaai.gov.in/learning", "_blank")}
                          className="w-full"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Documentation on India AI
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockAnalysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
