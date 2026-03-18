import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'

const PowerPointViewer = ({ onNavigate }) => {
  const [downloadStatus, setDownloadStatus] = useState({})

  const pptxFiles = [
    { 
      name: 'Unit 16 - な形容詞', 
      file: 'Unit16 （な  けいようし）ですね！.pptx',
      description: 'な-adjectives practice'
    },
    { 
      name: 'Unit 17 - ています練習', 
      file: 'Unit17 _teimasu _ていますの練習, レストラン.pptx',
      description: '~teimasu form & restaurant'
    },
    { 
      name: 'Unit 18 - 形容詞の過去形', 
      file: 'Unit18 วิธีพูดถึงอดีต  งานมอบหมาย 形容詞の過去形の練習.pptx',
      description: 'Past tense adjectives'
    },
    { 
      name: 'Unit 20 - ないでください', 
      file: 'Unit20 ～ないでくださいの練習 _naidekudasai.pptx',
      description: 'Negative requests'
    },
    { 
      name: 'Unit 21 & 23 - Location & が好き', 
      file: 'Unit21 位置いち Location, Unit 23 ～ga sukidesu.pptx',
      description: 'Location words & likes'
    },
    { 
      name: 'Unit 26 - 形容詞＋形容詞', 
      file: 'Unit26 形容詞＋形容詞 keeyooshi+keeyooshi.pptx',
      description: 'Combining adjectives'
    },
    { 
      name: 'Unit 28 - てもいいですか', 
      file: 'Unit28 ～てもいいですか？～temoiidesuka.pptx',
      description: 'Asking permission'
    }
  ]

  const handleDownload = async (fileName, index) => {
    try {
      setDownloadStatus({ ...downloadStatus, [index]: 'downloading' })
      const response = await fetch(`/src/pttx/${encodeURIComponent(fileName)}`)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setDownloadStatus({ ...downloadStatus, [index]: 'downloaded' })
      setTimeout(() => {
        setDownloadStatus({ ...downloadStatus, [index]: null })
      }, 2000)
    } catch (error) {
      console.error('Error downloading file:', error)
      setDownloadStatus({ ...downloadStatus, [index]: 'error' })
      setTimeout(() => {
        setDownloadStatus({ ...downloadStatus, [index]: null })
      }, 2000)
    }
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
          <p className="text-xl text-purple-600 mb-4 text-center font-bold">
            เอกสารประกอบการเรียน
          </p>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Click download to save files
          </p>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {pptxFiles.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-3 border-purple-300 hover:border-purple-500 transition-all"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-xl font-bold text-purple-700 mb-1">
                      � {item.name}
                    </h3>
                    <p className="text-sm text-purple-500 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500 truncate">{item.file}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      onClick={() => handleDownload(item.file, index)}
                      className="whitespace-nowrap"
                      disabled={downloadStatus[index] === 'downloading'}
                    >
                      {downloadStatus[index] === 'downloading' ? '⏳ Downloading...' : 
                       downloadStatus[index] === 'downloaded' ? '✓ Downloaded' :
                       downloadStatus[index] === 'error' ? '❌ Error' :
                       '📥 Download'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-300">
            <h3 className="text-lg font-bold text-blue-700 mb-3">💡 How to Use:</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>• Click <strong>Download</strong> to save the PowerPoint file</p>
              <p>• Open with Microsoft PowerPoint, Google Slides, or LibreOffice Impress</p>
            </div>
          </div>

          <Button onClick={() => onNavigate('home')} variant="secondary" className="w-full">
            ← Back to Home
          </Button>
        </motion.div>
      </Card>
    </div>
  )
}

export default PowerPointViewer
