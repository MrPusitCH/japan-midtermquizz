import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'

const PowerPointViewer = ({ onNavigate }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [viewerType, setViewerType] = useState('office') // 'office' or 'google'

  const pptxFiles = [
    { name: 'Unit 16 - な形容詞', file: 'Unit16 （な  けいようし）ですね！.pptx' },
    { name: 'Unit 17 - ています練習', file: 'Unit17 _teimasu _ていますの練習, レストラン.pptx' },
    { name: 'Unit 18 - 形容詞の過去形', file: 'Unit18 วิธีพูดถึงอดีต  งานมอบหมาย 形容詞の過去形の練習.pptx' },
    { name: 'Unit 20 - ないでください', file: 'Unit20 ～ないでくださいの練習 _naidekudasai.pptx' },
    { name: 'Unit 21 & 23 - Location & が好き', file: 'Unit21 位置いち Location, Unit 23 ～ga sukidesu.pptx' },
    { name: 'Unit 26 - 形容詞＋形容詞', file: 'Unit26 形容詞＋形容詞 keeyooshi+keeyooshi.pptx' },
    { name: 'Unit 28 - てもいいですか', file: 'Unit28 ～てもいいですか？～temoiidesuka.pptx' }
  ]

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const getViewerUrl = (fileName) => {
    // Get the full URL of the file
    const fileUrl = `${window.location.origin}/src/pttx/${encodeURIComponent(fileName)}`
    
    if (viewerType === 'office') {
      // Microsoft Office Online Viewer
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`
    } else {
      // Google Docs Viewer
      return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`
    }
  }

  const handleDownload = (fileName) => {
    const link = document.createElement('a')
    link.href = `/src/pttx/${encodeURIComponent(fileName)}`
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-6xl w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 text-center">
            📊 PowerPoint Materials
          </h1>
          <p className="text-xl text-purple-600 mb-8 text-center font-bold">
            เอกสารประกอบการเรียน
          </p>

          {!selectedFile ? (
            <>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {pptxFiles.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-3 border-purple-300 hover:border-purple-500 transition-all cursor-pointer"
                    onClick={() => handleFileSelect(item.file)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-purple-700 mb-1">
                          📄 {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.file}</p>
                      </div>
                      <div className="text-3xl">▶️</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button onClick={() => onNavigate('home')} variant="secondary" className="w-full">
                ← Back to Home
              </Button>
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <Button
                  onClick={() => setSelectedFile(null)}
                  variant="secondary"
                  size="sm"
                >
                  ← Back to List
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewerType('office')}
                    variant={viewerType === 'office' ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    Office Viewer
                  </Button>
                  <Button
                    onClick={() => setViewerType('google')}
                    variant={viewerType === 'google' ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    Google Viewer
                  </Button>
                  <Button
                    onClick={() => handleDownload(selectedFile)}
                    variant="secondary"
                    size="sm"
                  >
                    📥 Download
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border-3 border-purple-300 overflow-hidden"
                style={{ height: '80vh' }}
              >
                <iframe
                  src={getViewerUrl(selectedFile)}
                  className="w-full h-full"
                  frameBorder="0"
                  title="PowerPoint Viewer"
                  allowFullScreen
                >
                  <p className="p-4 text-center text-gray-600">
                    Your browser does not support iframes. 
                    <button 
                      onClick={() => handleDownload(selectedFile)}
                      className="text-purple-600 underline ml-2"
                    >
                      Download the file instead
                    </button>
                  </p>
                </iframe>
              </motion.div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                <p className="text-sm text-gray-700">
                  💡 <strong>Tip:</strong> If the presentation doesn't load, try switching between Office Viewer and Google Viewer, 
                  or download the file to view it locally.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </Card>
    </div>
  )
}

export default PowerPointViewer
