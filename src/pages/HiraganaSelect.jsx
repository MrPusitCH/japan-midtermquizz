import Card from '../components/Card'
import Button from '../components/Button'

const HiraganaSelect = ({ onNavigate, onBack }) => {
  const levels = [1, 2, 3]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <h2 className="text-4xl font-black text-purple-700 text-center mb-8">
          เลือกระดับ Hiragana 🔤
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {levels.map((level) => (
            <Button
              key={level}
              onClick={() => onNavigate('flashcard', level)}
              variant="secondary"
              className="text-2xl font-black"
            >
              Level {level}
            </Button>
          ))}
        </div>

        <Button onClick={onBack} variant="secondary" className="w-full">
          ← กลับ
        </Button>
      </Card>
    </div>
  )
}

export default HiraganaSelect
