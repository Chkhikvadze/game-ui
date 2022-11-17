// Create definition constants
export const PROCUREMENT_TYPE_OPTIONS = [
  {label:'Cash', value:'cash'},
  {label:'Finance lease', value:'finance_lease'},
  {label:'Operating lease', value:'operating_lease'},
]

// Create vehicle constants
export const BODY_TYPE_OPTIONS = [
  {label:'Bus', value:'bus'},
  {label:'Pickup', value:'pickup'},
  {label:'Convertible', value:'convertible'},
  {label:'Coupe', value:'coupe'},
  {label:'Hatchback', value:'hatchback'},
  {label:'Truck', value:'truck'},
  {label:'Sedan', value:'sedan'},
  {label:'SUV', value:'suv'},
  {label:'Utility', value:'utility'},
  {label:'Van', value:'van'},
  {label:'Wagon', value:'wagon'},
  {label:'MPV', value:'mpv'},
  {label:'Eductor', value:'eductor'},
  {label:'Rear Loader Garbage Truck', value:'rear_loader_garbage_truck'},
  {label:'Greenwaste', value:'greenwaste'},
  {label:'Side Loader Garbage Truck', value:'side_loader_garbage_truck'},
  {label:'Sweeper', value:'sweeper'},
  {label:'Tipper', value:'tipper'},
  {label:'Tray', value:'tray'},
  {label:'Graffiti Removal', value:'graffiti_removal'},
  {label:'Asphalt Truck', value:'asphalt_truck'},
  {label:'Water Tanker', value:'water_tanker'},
  {label:'Elevated Work Platform', value:'elevated_work_platform'},
  {label:'Prime Mover', value:'prime_mover'},
  {label:'Spreader', value:'spreader'},
  {label:'Specialist', value:'specialist'},
  {label:'Skip Truck', value:'skip_truck'},
  {label:'Hook Truck', value:'hook_truck'},
  {label:'Crane', value:'crane'},
  {label:'Pantech', value:'pantech'},
  {label:'Furniture Removal', value:'furniture_removal'},
  {label:'Service', value:'service'},
  {label:'Refuse Disposal', value:'refuse_disposal'},
  {label:'Cab Chassis', value:'cab_chassis'},
  {label:'Wrecking', value:'wrecking'},
  {label:'Attenuator', value:'attenuator'},
  {label:'Benkelman beam', value:'benkelman_beam'},
  {label:'Bitumen sprayer', value:'bitumen_sprayer'},
  {label:'Cone truck', value:'cone_truck'},
  {label:'Maintenance body', value:'maintenance_body'},
  {label:'Mobile office', value:'mobile_office'},
  {label:'Recovery Unit', value:'recovery_unit'},
  {label:'Tanker', value:'tanker'},
  {label:'Tautliner', value:'tautliner'},
  {label:'Tilt tray', value:'tilt_tray'},
  {label:'Tow truck', value:'tow_truck'},
]

export const DRIVE_TYPE_OPTIONS = [
  {label:'FWD', value:'FWD'},
  {label:'RWD', value:'RWD'},
  {label:'AWD', value:'AWD'},
  {label:'4*4', value:'4*4'},
  {label:'4*2', value:'4*2'},
  {label:'6*2', value:'6*2'},
  {label:'6*4', value:'6*4'},
  {label:'8*4', value:'8*4'},
]

export const FUEL_TYPE_OPTIONS = [
  {label:'Petrol', value:'Petrol'},
  {label:'Diesel', value:'Diesel'},
  {label:'Electric', value:'Electric'},
  {label:'Hydrogen', value:'Hydrogen'},
  {label:'Autogas', value:'Autogas'},
]

export const POWERTRAIN_TYPE_OPTIONS = [
  {label:'BEV', value:'BEV'},
  {label:'PHEV', value:'PHEV'},
  {label:'HEV', value:'HEV'},
  {label:'FCEV', value:'FCEV'},
  {label:'ICE', value:'ICE'},
]

export const RESIDUAL_VALUE_OPTIONS = [
  {label:'Manual', value:'manual'},
  {label:'ATO', value:'ATO'},
  {label:'Model', value:'model'},
]

export const FINANCIAL_YEAR_START_MONTH_OPTIONS = [
  {label:'January', value:'january'},
  {label:'February', value:'february'},
  {label:'March', value:'march'},
  {label:'April', value:'april'},
  {label:'May', value:'may'},
  {label:'June', value:'june'},
  {label:'July', value:'july'},
  {label:'August', value:'august'},
  {label:'September', value:'september'},
  {label:'October', value:'october'},
  {label:'November', value:'november'},
  {label:'December', value:'december'},
]

export const ORGANISATION_SIZE = [
  {value:'less-than-100', label:'Less than 100 employees'},
  {value:'more-than-100', label:'More than 100 employees'},
]

export const ORGANIZATION_TYPE = Object.freeze({
  aggFMO:{
	name:'Aggregator – Fleet Management Organisation (FMO)',
	value:'Aggregator – Fleet Management Organisation (FMO)',
  },
  aggOther:{
	name:'Aggregator – Other',
	value:'Aggregator – Other',
  },
  business:{
	name:'Business',
	value:'Business',
  },
  localGov:{
	name:'Local Government',
	value:'Local Government',
  },
  ngo:{
	name:'Non-governmental organisation (NGO)',
	value:'Non-governmental organisation (NGO)',
  },
})

// export const ORGANIZATION_FLEET_SIZE = Object.freeze({
//   "10To50": {
//     name: "10-50",
//     value: "10-50",
//   },
//   "51To100": {
//     name: "51-100",
//     value: "51-100",
//   },
//   "101To250": {
//     name: "101-250",
//     value: "101-250",
//   },
//   "251To500": {
//     name: "251-500",
//     value: "251-500",
//   },
//   "greaterThan500": {
//     name: ">500",
//     value: ">500",
//   },
// })

export const ORGANISATION_ROLE_OPTIONS = [
  {label:'Fleet manager', value:'Fleet manager'},
  {label:'Fleet consultant', value:'Fleet consultant'},
  {label:'Sustainability', value:'Sustainability'},
  {label:'Facilities manager', value:'Facilities manager'},
  {label:'Procurement manager', value:'Procurement manager'},
  {label:'Channel partner', value:'Channel partner'},
  {label:'Senior executive', value:'Senior executive'},
  {label:'Business owner', value:'Business owner'},
  {label:'Transport planner', value:'Transport planner'},
  {label:'Energy manager', value:'Energy manager'},
  {label:'Others', value:'Others'},
]

export const ORGANISATION_FLEET_SIZE_OPTIONS = [
  {
	value:'1-4',
	label:'1-4',
  },
  {
	value:'5-9',
	label:'5-9',
  },
  {
	value:'10-19',
	label:'10-19',
  },
  {
	value:'20-49',
	label:'20-49',
  },
  {
	value:'50-250',
	label:'50-250',
  },
  {
	value:'251-500',
	label:'251-500',
  },
  {
	value:'501-1000',
	label:'501-1000',
  },
  {
	value:'Greater than 1000',
	label:'Greater than 1000',
  },
  {
	value:'Unsure',
	label:'Unsure',
  },
]

export const ORGANISATION_INDUSTRY = [
  // { label: 'Company Industry', value: 'Company Industry' },
  {label:'Association and Not for Profit', value:'Association and Not for Profit'},
  {label:'Automotive', value:'Automotive'},
  {label:'Bus Operator', value:'Bus Operator'},
  {label:'Charging Infrastructure', value:'Charging Infrastructure'},
  {label:'Education', value:'Education'},
  {label:'Energy Network Business', value:'Energy Network Business'},
  {label:'Energy Retailer', value:'Energy Retailer'},
  {label:'Finance', value:'Finance'},
  {label:'FMO', value:'FMO'},
  {label:'GPS', value:'GPS'},
  {label:'Healthcare', value:'Healthcare'},
  {label:'Insurance', value:'Insurance'},
  {label:'IT', value:'IT'},
  {label:'Large Corporate', value:'Large Corporate'},
  {label:'Logistics Freight', value:'Logistics Freight'},
  {label:'Logistics Last Mile', value:'Logistics Last Mile'},
  {label:'Local Government', value:'Local Government'},
  {label:'Manufacturing', value:'Manufacturing'},
  {label:'Mass Transit', value:'Mass Transit'},
  {label:'Other Government', value:'Other Government'},
  {label:'Pharmaceutical', value:'Pharmaceutical'},
  {label:'Real Estate', value:'Real Estate'},
  {label:'Retail', value:'Retail'},
  {label:'Telecommunications', value:'Telecommunications'},
  {label:'Transport', value:'Transport'},
  {label:'Transit Authority', value:'Transit Authority'},
  {label:'Utilities', value:'Utilities'},
  {label:'Others', value:'Others'},
]

export const FLEET_TRANSITION_STATUS = [
  {label:'Not started', value:'Not started'},
  {label:'Budget for transition plan', value:'Budget for transition plan'},
  {label:'High level transition plan completed', value:'High level transition plan completed'},
  {label:'Detailed transition plan', value:'Detailed transition plan'},
  {label:'Pilot', value:'Pilot'},
  {label:'Looking for management software', value:'Looking for management software'},
  {label:'Scaling up', value:'Scaling up'},
  {label:'Looking for charging infrastructure', value:'Looking for charging infrastructure'},
  {label:'Looking for network planning advice', value:'Looking for network planning advice'},
  {label:'General advisory', value:'General advisory'},
  {label:'Other', value:'Other'},
]

export const MAIN_LINKS = {
  browse_vehicle:'https://betterfleet-develop-two.evenergi.com/browse-vehicles',
}

export const SOURCE_OF_RENEWABLE_ENERGY = [
  {
	value:'power_purchase_agreement',
	label:'Power purchase agreement',
  },
  {value:'green_energy', label:'Green energy'},
  {value:'on_site_renewables', label:'On site renewables'},
  {
	value:'on_site_renewables_with_batteries',
	label:'On site renewables with batteries',
  },
]


// new constants


export const game_category_options = [
  {value:'ACTION', label:'ACTION '},
  {value:'ADVENTURE', label:'ADVENTURE',},
  {value:'ANIMAL', label:'ANIMAL',},
  {value:'ART & CREATIVITY', label:'ART & CREATIVITY'},
  {value:'BOARD & CAR', label:'BOARD & CARD'},
  {value:'GIRL', label:'GIRL'},
  {value:'MULTIPLAYER', label:'MULTIPLAYER',},
  {value:'PUZZLE', label:'PUZZLE',},
  {value:'RACING', label:'RACING',},
  {value:'SHOOTING', label:'SHOOTING',},
  {value:'SKILL GAMES', label:'SKILL GAMES',},
  {value:'SPECIAL', label:'SPECIAL',},
  {value:'SIMULATION', label:'SIMULATION',},
  {value:'SPORTS', label:'SPORTS',},
  {value:'STRATEGY', label:'STRATEGY',},
  {value:'VEHICLE', label:'VEHICLE',},
]

export const  collection_category_options =  [
  {value:"Art", label:'Art'},
  {value:"Lands", label:'Lands'},
  {value:"Collectibles", label:'Collectibles'},
  {value:"Guns", label:'Guns'},
  {value:"Skins", label:'Skins'},
  {value:"Properties", label:'Properties'},
]