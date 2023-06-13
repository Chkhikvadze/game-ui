import Accessories from 'assets/images/collectionImage/accessories.webp'
import Animals from 'assets/images/collectionImage/animals.webp'
import Backpacks from 'assets/images/collectionImage/backpacks.webp'
import Cards from 'assets/images/collectionImage/cards.webp'
import Castles from 'assets/images/collectionImage/castles.webp'
import Clothes from 'assets/images/collectionImage/clothes.webp'
import EasterEggs from 'assets/images/collectionImage/eastereggs.webp'
import Glasses from 'assets/images/collectionImage/glasses.webp'
import Gods from 'assets/images/collectionImage/gods.webp'
import Helmets from 'assets/images/collectionImage/helmets.webp'
import Houses from 'assets/images/collectionImage/houses .webp'
import Jewelry from 'assets/images/collectionImage/jewelry.webp'
import Lands from 'assets/images/collectionImage/lands.webp'
import Motors from 'assets/images/collectionImage/motors.webp'
import Nitros from 'assets/images/collectionImage/nitros.webp'
import Poison from 'assets/images/collectionImage/poison.webp'
import Action from 'assets/images/action.webp'
import Reptiles from 'assets/images/collectionImage/reptiles.webp'
import Shields from 'assets/images/collectionImage/shields.webp'
import Ships from 'assets/images/collectionImage/ships.webp'
import Skins from 'assets/images/collectionImage/skins.webp'
import SteeringWheels from 'assets/images/collectionImage/steeringWheels.webp'
import Trophies from 'assets/images/collectionImage/trophies.webp'
import Tyres from 'assets/images/collectionImage/tyres.webp'
import Vehicles from 'assets/images/collectionImage/vehicles.webp'
import Warriors from 'assets/images/collectionImage/warriors.webp'
import Weapons from 'assets/images/collectionImage/weapons.webp'
import Worlds from 'assets/images/collectionImage/worlds.webp'
import Card from 'assets/images/cards.webp'
import Adventure from 'assets/images/adventure.webp'
import Animal from 'assets/images/animal.webp'
import Arcade from 'assets/images/arcade.webp'
import ArtAndCreativity from 'assets/images/artAndCreativity.webp'
import Multiplayer from 'assets/images/multiplayer.webp'
import Puzzle from 'assets/images/puzzle.webp'
import Racing from 'assets/images/racing.webp'
import RPG from 'assets/images/rpg.webp'
import SciFi from 'assets/images/sci-fi.webp'
import Shooting from 'assets/images/shooting.webp'
import Simulation from 'assets/images/simulation.webp'
import Skill from 'assets/images/skill.webp'
import Sport from 'assets/images/sport.webp'
import Strategy from 'assets/images/strategy .webp'
import Vehicle from 'assets/images/vehicle.webp'
import Zombie from 'assets/images/zombie.webp'

type ImageCategory =
  | 'Action'
  | 'Board & Card'
  | 'Adventure'
  | 'Animal'
  | 'Arcade'
  | 'Art & Creativity'
  | 'Multiplayer'
  | 'Puzzle'
  | 'Racing'
  | 'RPG'
  | 'Sci-Fi'
  | 'Shooting'
  | 'Simulation'
  | 'Skill Games'
  | 'Strategy'
  | 'Vehicle'
  | 'Zombie'
  | 'Sports'

const imgObject = [
  { imageName: 'Accessories', imageSrc: Accessories },
  { imageName: 'Animals', imageSrc: Animals },
  { imageName: 'Backpacks', imageSrc: Backpacks },
  { imageName: 'Cards', imageSrc: Cards },
  { imageName: 'Castles', imageSrc: Castles },
  { imageName: 'Clothes', imageSrc: Clothes },
  { imageName: 'EasterEggs', imageSrc: EasterEggs },
  { imageName: 'Glasses', imageSrc: Glasses },
  { imageName: 'Gods', imageSrc: Gods },
  { imageName: 'Helmets', imageSrc: Helmets },
  { imageName: 'Houses', imageSrc: Houses },
  { imageName: 'Jewelry', imageSrc: Jewelry },
  { imageName: 'Lands', imageSrc: Lands },
  { imageName: 'Motors', imageSrc: Motors },
  { imageName: 'Nitros', imageSrc: Nitros },
  { imageName: 'Poison', imageSrc: Poison },
  { imageName: 'Action', imageSrc: Action },
  { imageName: 'Reptiles', imageSrc: Reptiles },
  { imageName: 'Shields', imageSrc: Shields },
  { imageName: 'Ships', imageSrc: Ships },
  { imageName: 'Skins', imageSrc: Skins },
  { imageName: 'SteeringWheels', imageSrc: SteeringWheels },
  { imageName: 'Trophies', imageSrc: Trophies },
  { imageName: 'Tyres', imageSrc: Tyres },
  { imageName: 'Vehicles', imageSrc: Vehicles },
  { imageName: 'Warriors', imageSrc: Warriors },
  { imageName: 'Weapons', imageSrc: Weapons },
  { imageName: 'Worlds', imageSrc: Worlds },
  { imageName: 'Adventure', imageSrc: Adventure },
  { imageName: 'Animal', imageSrc: Animal },
  { imageName: 'Arcade', imageSrc: Arcade },
  { imageName: 'Multiplayer', imageSrc: Multiplayer },
  { imageName: 'Puzzle', imageSrc: Puzzle },
  { imageName: 'Racing', imageSrc: Racing },
  { imageName: 'RPG', imageSrc: RPG },
  { imageName: 'SciFi', imageSrc: SciFi },
  { imageName: 'Shooting', imageSrc: Shooting },
  { imageName: 'Simulation', imageSrc: Simulation },
  { imageName: 'Skill', imageSrc: Skill },
  { imageName: 'Sport', imageSrc: Sport },
  { imageName: 'Strategy', imageSrc: Strategy },
  { imageName: 'Vehicle', imageSrc: Vehicle },
  { imageName: 'Zombie', imageSrc: Zombie },
  { imageName: 'Card', imageSrc: Card },
  { imageName: 'ArtAndCreativity', imageSrc: ArtAndCreativity },
]

const getDefaultImage = (category: ImageCategory) => {
  const getImageSource = (category: ImageCategory) => {
    const res = imgObject.find((item: any) => item.imageName === category)
    return res
  }

  const imageSource: any = getImageSource(category)

  return imageSource
}

export default getDefaultImage
