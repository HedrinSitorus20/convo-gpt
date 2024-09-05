'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import parse from 'html-react-parser'

export default function Component() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('')
  const [numPersons, setNumPersons] = useState('')
  const [generatedScript, setGeneratedScript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedScript(''); // Clear the old dialogue
    try {
      const response = await fetch('http://localhost:8000/generate-dialogue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          num_person: parseInt(numPersons, 10),
          theme: prompt,
        }),
      });
      const data = await response.json();
      typeWriter(data.dialogue);
    } catch (error) {
      console.error('Error generating dialogue:', error);
      setGeneratedScript('Error generating dialogue. Please try again.');
      setIsGenerating(false);
    }
  };

  const typeWriter = (text: string, index = 0) => {
    if (index < text.length) {
      const chunkSize = 5 // Add 5 characters at a time
      const end = Math.min(index + chunkSize, text.length)
      setGeneratedScript((prev) => prev + text.slice(index, end))
      setTimeout(() => typeWriter(text, end), 50)
    } else {
      setIsGenerating(false)
    }
  }

  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center"> Convo-GPT</h1>
      <h2 className="text-xl font-semibold mb-4 text-center">Learn language better using AI-generated dialogue script in any language!</h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr,2fr]">
        <div className="space-y-4">
          <Textarea
            placeholder="Enter the theme for your dialogue..."
            className="min-h-[200px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
            <Select value={numPersons} onValueChange={setNumPersons}>
              <SelectTrigger>
                <SelectValue placeholder="Number of persons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 persons</SelectItem>
                <SelectItem value="3">3 persons</SelectItem>
                <SelectItem value="4">4 persons</SelectItem>
                <SelectItem value="5">5 persons</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            className="w-full" 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt || !language || !numPersons}
          >
            {isGenerating ? 'Generating...' : 'Generate Script'}
          </Button>
        </div>
        <div className="bg-muted p-4 rounded-lg min-h-[200px] relative">
          <h2 className="text-xl font-semibold mb-4">Generated Script:</h2>
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {parse(formatText(generatedScript))}
          </pre>
          {isGenerating && (
            <div className="absolute bottom-4 right-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}