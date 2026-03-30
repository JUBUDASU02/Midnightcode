import Navbar from "../../../components/Layout/Navbar"
import Hero from "../../../components/sections/Hero"
import Experience from "../../../components/sections/Experience"
import MenuPreview from "../../../components/sections/MenuPreview"
import LiveActs from "../../../components/sections/LiveActs"
import VipGallery from "../../../components/sections/VipGallery"
import Location from "../../../components/sections/Location"
import CTA from "../../../components/sections/CTA"
import Footer from "../../../components/Layout/Footer"

export default function HomePage() {

return (

<div className="bg-background-dark text-white font-display">

<Navbar/>

<Hero/>

<Experience/>

<MenuPreview/>

<LiveActs/>

<VipGallery/>

<Location/>

<CTA/>

<Footer/>

</div>

)
}
