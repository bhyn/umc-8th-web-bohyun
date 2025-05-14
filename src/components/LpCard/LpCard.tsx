import { Lp } from "../../types/lp"

interface LpCardProps{
    lp:Lp
}

const LpCard = ({lp}:LpCardProps) => {
    return (
        <div key={lp.id} className="relative rounded-lg cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img src={lp.thumbnail} alt={lp.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-bold">{lp.title}</h3>
        </div>
    </div>
    )
}

export default LpCard