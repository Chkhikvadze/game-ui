import React from 'react'
import HomeIconSvg from "../assets/svgComponents/HomeIconSvg"
import SavedIconSvg from "../assets/svgComponents/SavedIconSvg"
import WalletIconSvg from "../assets/svgComponents/WalletIconSvg"
import { useParams } from "react-router-dom";
import { useProjectByIdService } from "services/useProjectService";


const headerData = [
  {name:"home", routeLink:"/", icon:<HomeIconSvg/>},
  // { name: "channels", routeLink: "/channels", icon: <ChannelsIconSvg /> },
  // { name: "saved", routeLink: "/saved", icon: <SavedIconSvg /> },
  {name:"Games", routeLink:"games", icon:<WalletIconSvg/>},
  {name:"Wallets", routeLink:"wallets", icon:<WalletIconSvg/>},
  {name:"Settings", routeLink:"settings", icon:<WalletIconSvg/>},
]

const useNavbarData: any = () => {
  const params = useParams()
  const projectId = params.id
  const {data:project} = useProjectByIdService({id:projectId})
  const {name:project_name} = project
  const gameId = `game/${projectId}`.toString()
  
  
  const navbarData: any = {
	"main-menu":{
	  header:"Menu",
	  routeName:"main-menu",
	  goBack:false,
	  subRoute:false,
	  menuItemList:[
		{name:"Games", routeLink:"/games", icon:<HomeIconSvg/>},
		{name:"API Keys", routeLink:"/api-keys", icon:<WalletIconSvg/>},
		{name:"Settings", routeLink:"/settings", icon:<WalletIconSvg/>},
		{name:"Logs", routeLink:"/logs", icon:<WalletIconSvg/>},
		{name:"Teams", routeLink:"/teams", icon:<WalletIconSvg/>},
		// { name: "Events", routeLink: "/events", icon: <WalletIconSvg /> },
		{name:"Doc", routeLink:"/doc", icon:<SavedIconSvg/>},
		{name:"Test", routeLink:"/fornite", icon:<SavedIconSvg/>},
		{name:"About", routeLink:"/about", icon:<HomeIconSvg/>},
	  ],
	},
	
	[ gameId ]:{
	  header:[project_name],
	  routeName:[gameId],
	  goBack:true,
	  subRoute:true,
	  menuItemList:[
		// games group
		{name:"General", routeLink:`${gameId}`, icon:<HomeIconSvg/>},
		{name:"Collections", routeLink:`${gameId}/collections`, icon:<HomeIconSvg/>},
		{name:"Contracts", routeLink:`${gameId}/contracts`, icon:<HomeIconSvg/>},
	  ],
	},
	// fornite:{
	// header:"Fornite",
	// routeName:"/{1}/about",
	// goBack:true,
	// menuItemList:[
	//   {name:"About", routeLink:"/{1}/about", icon:<HomeIconSvg/>},
	//   {
	// 	name:"Contracts",
	// 	routeLink:"/contracts",
	// 	icon:<NewsPaperIconSvg/>,
	//   },
	//   {
	// 	name:"Collections",
	// 	routeLink:"/Collections",
	// 	icon:<NewsPaperIconSvg/>,
	//   },
	//   {name:"NFTs", routeLink:"/nfts", icon:<NewsPaperIconSvg/>},
	//   {
	// 	name:"Analytics",
	// 	routeLink:"/analytics/{id}",
	// 	icon:<DeployIconSvg/>,
	//   },
	//   {
	// 	name:"Players (coming soon)",
	// 	routeLink:"/analytics/{id}",
	// 	icon:<DeployIconSvg/>,
	//   },
	//   {
	// 	name:"Channels (coming soon)",
	// 	routeLink:"/analytics/{id}",
	// 	icon:<DeployIconSvg/>,
	//   },
	//   {name:"A Contract", routeLink:"/contract", icon:<DeployIconSvg/>},
	// ],
	// },
	// contract:{
	// header:"Contract",
	// routeName:"/{1}/about",
	// menuItemList:[
	//   {
	// 	name:"Methods",
	// 	routeLink:"/[game]/[contract]/methods",
	// 	icon:<HomeIconSvg/>,
	//   },
	//   {
	// 	name:"Source Code",
	// 	routeLink:"/[game]/[contract]/Source",
	// 	icon:<NewsPaperIconSvg/>,
	//   },
	//   {
	// 	name:"Collections",
	// 	routeLink:"/collections",
	// 	icon:<NewsPaperIconSvg/>,
	//   },
	//   {name:"Assets", routeLink:"/assets", icon:<NewsPaperIconSvg/>},
	//   {name:"Addons", routeLink:"/addons", icon:<NewsPaperIconSvg/>},
	//   {name:"Tools", routeLink:"/tools", icon:<NewsPaperIconSvg/>},
	// ],
	// },
  }
  
  // navbarData[ gameId ] = gameId
  // const gameObj = {
  // header:"project_name",
  // routeName:"game",
  // goBack:true,
  // subRoute:true,
  // menuItemList:[
  //   // games group
  //   {name:"Games", routeLink:`create-game/`, icon:<HomeIconSvg/>},
  //   {name:"Game", routeLink:`create-game/game`, icon:<HomeIconSvg/>},
  //   {name:"General", routeLink:`create-game/general/:id`, icon:<HomeIconSvg/>},
  //   {name:"New Game", routeLink:`create-game/new-game`, icon:<HomeIconSvg/>},
  //   //
  //   // {name:"About", routeLink:`create-game/about`, icon:<HomeIconSvg/>},
  //   // {
  //   //   name:"NFTs",
  //   //   routeLink:`create-game/nfts`,
  //   //   icon:<NewsPaperIconSvg/>,
  //   // },
  //   // {
  //   //   name:"Addons",
  //   //   routeLink:`create-game/addons`,
  //   //   icon:<NewsPaperIconSvg/>,
  //   // },
  //   // {
  //   //   name:"Deploy",
  //   //   routeLink:`create-game/deploy`,
  //   //   icon:<DeployIconSvg/>,
  //   // },
  // ],
  // }
  //
  return {
	navbarData
  }
}
export { headerData, useNavbarData }
