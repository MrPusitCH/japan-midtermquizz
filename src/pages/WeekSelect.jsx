import Card from '../components/Card'
import Button from '../components/Button'

const WeekSelect = ({ onNavigate, onBack }) => {
  const weeks = [1, 2, 3, 4, 5, 8]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <h2 className="text-4xl font-black text-purple-700 text-center mb-8">
          เลือก Week 📚
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {weeks.map((week) => (
            <Button
              key={week}
              onClick={() => onNavigate('quiz', week)}
              variant="secondary"
              className="text-2xl font-black"
            >
              Week {week}
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

export default WeekSelect
