import HomeIconSvg from '../assets/svgComponents/HomeIconSvg'
import WalletIconSvg from '../assets/svgComponents/WalletIconSvg'
import About from '@l3-lib/ui-core/dist/icons/About'
import API from '@l3-lib/ui-core/dist/icons/API'
import Doc from '@l3-lib/ui-core/dist/icons/Doc'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import Teams from '@l3-lib/ui-core/dist/icons/Teams'
import Players from '@l3-lib/ui-core/dist/icons/Players'
import Payments from '@l3-lib/ui-core/dist/icons/Payments'
import Contracts from '@l3-lib/ui-core/dist/icons/Contracts'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Logs from '@l3-lib/ui-core/dist/icons/Logs'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'

const HEADER_DATA = [
  { name: 'home', routeLink: '/', icon: <HomeIconSvg /> },
  // { name: "channels", routeLink: "/channels", icon: <ChannelsIconSvg /> },
  // { name: "saved", routeLink: "/saved", icon: <SavedIconSvg /> },
  { name: 'Games', routeLink: '/game', icon: <WalletIconSvg /> },
  { name: 'Wallets', routeLink: '/wallets', icon: <WalletIconSvg /> },
  { name: 'Settings', routeLink: '/settings', icon: <WalletIconSvg /> },
]

const menuItemList = [
  { name: 'Home', routeLink: '/', icon: About, active: 'home' },
  { name: 'Games', routeLink: 'game', icon: Games, active: 'game' },
  // { name: 'Settings', routeLink: '/settings', icon: Settings, active: 'settings' },
  // { name: 'Logs', routeLink: '/logs', icon: BulletList, active: 'logs' },
  { name: 'Teams', routeLink: '/teams', icon: Teams, active: 'teams' },
  // { name: 'API', routeLink: '/api-keys', icon: API, active: 'api-keys' },
  { name: 'Developers', routeLink: '/developers', icon: API, active: 'developers' },
  // { name: "Events", routeLink: "/events", icon: <WalletIconSvg /> },
  // { name: 'Doc', routeLink: '/doc', icon: Doc, active: 'doc' },
  // {name:"Test", routeLink:"/fornite", icon:<SavedIconSvg/>},
  // {name:"About", routeLink:"/about", icon:<HomeIconSvg/>},
  // {name:"Collection", routeLink:"/collection/:id", icon:<HomeIconSvg/>},
]

const gameItemList = [
  {
    name: 'About',
    routeLink: 'general',
    icon: About,
    active: 'general',
    description: 'about description',
  },
  {
    name: 'Resources Hub',
    routeLink: 'resources',
    icon: About,
    active: 'resources',
    description: 'about description',
  },
  {
    name: 'Collections',
    routeLink: 'collections',
    icon: Collection,
    active: 'collections',
    description: 'Collections description',
  },
  {
    name: 'Players',
    routeLink: 'players',
    icon: Players,
    active: 'players',
    description: 'Players description',
  },
  {
    name: 'Contracts',
    routeLink: 'contracts',
    icon: Contracts,
    active: 'contracts',
    description: 'Contracts description',
  },
  {
    name: 'Transactions',
    routeLink: 'transactions',
    icon: Payments,
    active: 'transactions',
    description: 'Transactions description',
  },
]

const collectionItemList = [
  { name: 'About', routeLink: 'general', icon: About, active: 'general' },
  { name: 'Asset', routeLink: 'assets', icon: Collection, active: 'assets' },
  { name: 'Properties', routeLink: 'properties', icon: API, active: 'properties' },
]
const PLAYER_ITEM_LIST = [
  { name: 'About Player', routeLink: 'about', icon: About, active: 'about' },
  { name: 'Assets Own', routeLink: 'assets', icon: Teams, active: 'assets' },
  { name: 'Transactions', routeLink: 'transactions', icon: Payments, active: 'transactions' },
  {
    name: 'Player API',
    routeLink: 'https://docs.l3vels.xyz/reference/playercontroller_playerbyid',
    icon: Collection,
    active: 'new tab',
  },
]

const CONTRACT_ITEM_LIST = [{ name: 'About', routeLink: 'general', icon: About, active: 'general' }]
const DEVELOPERS_ITEM_LIST = [
  // { name: 'Overview', routeLink: 'overview', icon: Games, active: 'overview' },
  { name: 'API keys', routeLink: 'api-keys', icon: Games, active: 'api-keys' },
  { name: 'Logs', routeLink: 'logs', icon: Logs, active: 'logs' },
  { name: 'Webhooks', routeLink: 'webhook', icon: TagsOutline, active: 'webhook' },
  {
    name: 'Docs',
    // routeLink: 'docs',
    icon: Doc,
    active: 'new tab',
    routeLink: 'https://docs.l3vels.xyz/docs',
  },
]

// const useNavbarData: any = () => {
//   const params = useParams()
//   const gameId = params.id
//   const {data:game} = useGameByIdService({id:gameId})
//   const {name:game_name} = game
//
//   const {data:collection} = useCollectionByIdService({id:gameId})
//   const {name:collection_name} = collection
//
//   const gameId = `game/${gameId}`.toString()
//   const collectionId = `collection/${gameId}`.toString()
//
//
//   const navbarData: any = {
// 	"main-menu":{
// 	  header:"Menu",
// 	  routeName:"main-menu",
// 	  goBack:false,
// 	  subRoute:false,
// 	  menuItemList:[
// 		{name:"Games", routeLink:"game", icon:<HomeIconSvg/>},
// 		{name:"API Keys", routeLink:"/api-keys", icon:<WalletIconSvg/>},
// 		{name:"Settings", routeLink:"/settings", icon:<WalletIconSvg/>},
// 		{name:"Logs", routeLink:"/logs", icon:<WalletIconSvg/>},
// 		{name:"Teams", routeLink:"/teams", icon:<WalletIconSvg/>},
// 		// { name: "Events", routeLink: "/events", icon: <WalletIconSvg /> },
// 		{name:"Doc", routeLink:"/doc", icon:<SavedIconSvg/>},
// 		{name:"Test", routeLink:"/fornite", icon:<SavedIconSvg/>},
// 		{name:"About", routeLink:"/about", icon:<HomeIconSvg/>},
// 		{name:"Collection", routeLink:"/collection/:id", icon:<HomeIconSvg/>},
// 	  ],
// 	},
//
// 	[ gameId ]:{
// 	  header:[game_name],
// 	  routeName:[gameId],
// 	  goBack:true,
// 	  subRoute:false,
// 	  menuItemList:[
// 		// games group
// 		{name:"General", routeLink:`${gameId}`, icon:<HomeIconSvg/>},
// 		{name:"Collections", routeLink:`${gameId}/collections`, icon:<HomeIconSvg/>},
// 		{name:"Contracts", routeLink:`${gameId}/contracts`, icon:<HomeIconSvg/>},
// 	  ],
// 	},
//
// 	[ collectionId ]:{
// 	  header:[collection_name],
// 	  routeName:[collectionId],
// 	  goBack:true,
// 	  subRoute:true,
// 	  menuItemList:[
// 		// games group
// 		{name:"General", routeLink:`${collectionId}`, icon:<HomeIconSvg/>},
// 		{name:"NFT", routeLink:`${collectionId}/asset`, icon:<HomeIconSvg/>},
// 		{name:"Properties", routeLink:`${collectionId}/properties`, icon:<HomeIconSvg/>},
// 		// {name:"Properties", routeLink:`asset/:id`, icon:<HomeIconSvg/>},
// 	  ],
// 	},
// 	// fornite:{
// 	// header:"Fornite",
// 	// routeName:"/{1}/about",
// 	// goBack:true,
// 	// menuItemList:[
// 	//   {name:"About", routeLink:"/{1}/about", icon:<HomeIconSvg/>},
// 	//   {
// 	// 	name:"Contracts",
// 	// 	routeLink:"/contracts",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Collections",
// 	// 	routeLink:"/Collections",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {name:"NFTs", routeLink:"/assets", icon:<NewsPaperIconSvg/>},
// 	//   {
// 	// 	name:"Analytics",
// 	// 	routeLink:"/analytics/{id}",
// 	// 	icon:<DeployIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Players (coming soon)",
// 	// 	routeLink:"/analytics/{id}",
// 	// 	icon:<DeployIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Channels (coming soon)",
// 	// 	routeLink:"/analytics/{id}",
// 	// 	icon:<DeployIconSvg/>,
// 	//   },
// 	//   {name:"A Contract", routeLink:"/contract", icon:<DeployIconSvg/>},
// 	// ],
// 	// },
// 	// contract:{
// 	// header:"Contract",
// 	// routeName:"/{1}/about",
// 	// menuItemList:[
// 	//   {
// 	// 	name:"Methods",
// 	// 	routeLink:"/[game]/[contract]/methods",
// 	// 	icon:<HomeIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Source Code",
// 	// 	routeLink:"/[game]/[contract]/Source",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Collections",
// 	// 	routeLink:"/collections",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {name:"Assets", routeLink:"/assets", icon:<NewsPaperIconSvg/>},
// 	//   {name:"Addons", routeLink:"/addons", icon:<NewsPaperIconSvg/>},
// 	//   {name:"Tools", routeLink:"/tools", icon:<NewsPaperIconSvg/>},
// 	// ],
// 	// },
//   }
//
//   // navbarData[ gameId ] = gameId
//   // const gameObj = {
//   // header:"game_name",
//   // routeName:"game",
//   // goBack:true,
//   // subRoute:true,
//   // menuItemList:[
//   //   // games group
//   //   {name:"Games", routeLink:`create-game/`, icon:<HomeIconSvg/>},
//   //   {name:"Game", routeLink:`create-Game`, icon:<HomeIconSvg/>},
//   //   {name:"General", routeLink:`create-game/general/:id`, icon:<HomeIconSvg/>},
//   //   {name:"New Game", routeLink:`create-game/new-game`, icon:<HomeIconSvg/>},
//   //   //
//   //   // {name:"About", routeLink:`create-game/about`, icon:<HomeIconSvg/>},
//   //   // {
//   //   //   name:"NFTs",
//   //   //   routeLink:`create-game/assets`,
//   //   //   icon:<NewsPaperIconSvg/>,
//   //   // },
//   //   // {
//   //   //   name:"Addons",
//   //   //   routeLink:`create-game/addons`,
//   //   //   icon:<NewsPaperIconSvg/>,
//   //   // },
//   //   // {
//   //   //   name:"Deploy",
//   //   //   routeLink:`create-game/deploy`,
//   //   //   icon:<DeployIconSvg/>,
//   //   // },
//   // ],
//   // }
//   //
//   return {
// 	navbarData
//   }
// }
// const useNavbarData: any = () => {
//   const params = useParams()
//   const gameId = params.id
//   const {data:game} = useGameByIdService({id:gameId})
//   const {name:game_name} = game
//
//   const {data:collection} = useCollectionByIdService({id:gameId})
//   const {name:collection_name} = collection
//
//   const gameId = `game/${gameId}`.toString()
//   const collectionId = `collection/${gameId}`.toString()
//
//
//   const navbarData: any = {
// 	"main-menu":{
// 	  header:"Menu",
// 	  routeName:"main-menu",
// 	  goBack:false,
// 	  subRoute:false,
// 	  menuItemList:[
// 		{name:"Games", routeLink:"game", icon:<HomeIconSvg/>},
// 		{name:"API Keys", routeLink:"/api-keys", icon:<WalletIconSvg/>},
// 		{name:"Settings", routeLink:"/settings", icon:<WalletIconSvg/>},
// 		{name:"Logs", routeLink:"/logs", icon:<WalletIconSvg/>},
// 		{name:"Teams", routeLink:"/teams", icon:<WalletIconSvg/>},
// 		// { name: "Events", routeLink: "/events", icon: <WalletIconSvg /> },
// 		{name:"Doc", routeLink:"/doc", icon:<SavedIconSvg/>},
// 		{name:"Test", routeLink:"/fornite", icon:<SavedIconSvg/>},
// 		{name:"About", routeLink:"/about", icon:<HomeIconSvg/>},
// 		{name:"Collection", routeLink:"/collection/:id", icon:<HomeIconSvg/>},
// 	  ],
// 	},
//
// 	[ gameId ]:{
// 	  header:[game_name],
// 	  routeName:[gameId],
// 	  goBack:true,
// 	  subRoute:false,
// 	  menuItemList:[
// 		// games group
// 		{name:"General", routeLink:`${gameId}`, icon:<HomeIconSvg/>},
// 		{name:"Collections", routeLink:`${gameId}/collections`, icon:<HomeIconSvg/>},
// 		{name:"Contracts", routeLink:`${gameId}/contracts`, icon:<HomeIconSvg/>},
// 	  ],
// 	},
//
// 	[ collectionId ]:{
// 	  header:[collection_name],
// 	  routeName:[collectionId],
// 	  goBack:true,
// 	  subRoute:true,
// 	  menuItemList:[
// 		// games group
// 		{name:"General", routeLink:`${collectionId}`, icon:<HomeIconSvg/>},
// 		{name:"NFT", routeLink:`${collectionId}/asset`, icon:<HomeIconSvg/>},
// 		{name:"Properties", routeLink:`${collectionId}/properties`, icon:<HomeIconSvg/>},
// 		// {name:"Properties", routeLink:`asset/:id`, icon:<HomeIconSvg/>},
// 	  ],
// 	},
// 	// fornite:{
// 	// header:"Fornite",
// 	// routeName:"/{1}/about",
// 	// goBack:true,
// 	// menuItemList:[
// 	//   {name:"About", routeLink:"/{1}/about", icon:<HomeIconSvg/>},
// 	//   {
// 	// 	name:"Contracts",
// 	// 	routeLink:"/contracts",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Collections",
// 	// 	routeLink:"/Collections",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {name:"NFTs", routeLink:"/assets", icon:<NewsPaperIconSvg/>},
// 	//   {
// 	// 	name:"Analytics",
// 	// 	routeLink:"/analytics/{id}",
// 	// 	icon:<DeployIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Players (coming soon)",
// 	// 	routeLink:"/analytics/{id}",
// 	// 	icon:<DeployIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Channels (coming soon)",
// 	// 	routeLink:"/analytics/{id}",
// 	// 	icon:<DeployIconSvg/>,
// 	//   },
// 	//   {name:"A Contract", routeLink:"/contract", icon:<DeployIconSvg/>},
// 	// ],
// 	// },
// 	// contract:{
// 	// header:"Contract",
// 	// routeName:"/{1}/about",
// 	// menuItemList:[
// 	//   {
// 	// 	name:"Methods",
// 	// 	routeLink:"/[game]/[contract]/methods",
// 	// 	icon:<HomeIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Source Code",
// 	// 	routeLink:"/[game]/[contract]/Source",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {
// 	// 	name:"Collections",
// 	// 	routeLink:"/collections",
// 	// 	icon:<NewsPaperIconSvg/>,
// 	//   },
// 	//   {name:"Assets", routeLink:"/assets", icon:<NewsPaperIconSvg/>},
// 	//   {name:"Addons", routeLink:"/addons", icon:<NewsPaperIconSvg/>},
// 	//   {name:"Tools", routeLink:"/tools", icon:<NewsPaperIconSvg/>},
// 	// ],
// 	// },
//   }
//
//   // navbarData[ gameId ] = gameId
//   // const gameObj = {
//   // header:"game_name",
//   // routeName:"game",
//   // goBack:true,
//   // subRoute:true,
//   // menuItemList:[
//   //   // games group
//   //   {name:"Games", routeLink:`create-game/`, icon:<HomeIconSvg/>},
//   //   {name:"Game", routeLink:`create-Game`, icon:<HomeIconSvg/>},
//   //   {name:"General", routeLink:`create-game/general/:id`, icon:<HomeIconSvg/>},
//   //   {name:"New Game", routeLink:`create-game/new-game`, icon:<HomeIconSvg/>},
//   //   //
//   //   // {name:"About", routeLink:`create-game/about`, icon:<HomeIconSvg/>},
//   //   // {
//   //   //   name:"NFTs",
//   //   //   routeLink:`create-game/assets`,
//   //   //   icon:<NewsPaperIconSvg/>,
//   //   // },
//   //   // {
//   //   //   name:"Addons",
//   //   //   routeLink:`create-game/addons`,
//   //   //   icon:<NewsPaperIconSvg/>,
//   //   // },
//   //   // {
//   //   //   name:"Deploy",
//   //   //   routeLink:`create-game/deploy`,
//   //   //   icon:<DeployIconSvg/>,
//   //   // },
//   // ],
//   // }
//   //
//   return {
// 	navbarData
//   }
// }
export {
  HEADER_DATA,
  menuItemList,
  gameItemList,
  CONTRACT_ITEM_LIST,
  DEVELOPERS_ITEM_LIST,
  collectionItemList,
  PLAYER_ITEM_LIST,
}
