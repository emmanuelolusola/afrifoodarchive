import NavBar from "../../components/NavBar/NavBar"
import sola from '../../assets/Frame 49.png'
import juwon from '../../assets/Frame 49 2.png'
import Footer from "../../components/Footer/Footer"

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="py-10 md:py-16  lg:py-20 flex gap-10 lg:gap-0 lg:flex-row  flex-col px-[20px] md:px-[80px] lg:px-[150px]">
        <div className="w-full lg:w-[65%] lg:pr-40">
          <h1 className="text-[24px] lg:text-[32px] text-[#1D1D1F] pb-6 font-medium">About</h1>
          <div className="flex flex-col gap-6 md:gap-10">
            <p className="text-black text-base lg:text-[22px] leading-8">Afri Food Archive is a digital treasure trove of over 2000 African foods, showcasing the diverse culinary traditions from across the continent. It provides detailed insights into each dish, its cultural significance, and the regions where it is commonly found. For those inspired to try their hand at African cooking, each entry also includes a link to a YouTube tutorial.</p>
            <p className="text-black text-base lg:text-[22px] leading-8">The archive is a labor of love, curated and developed by two friends united by a shared passion for creating projects that benefit everyone. Their goal is to document and celebrate Africa’s rich culinary heritage while making it accessible to a global audience.</p>
            <p className="text-black text-base lg:text-[22px] leading-8">Afri Food Archive is more than a collection—it’s a platform for exploration, education, and storytelling, inviting users to discover the flavors and stories of Africa’s diverse food culture.</p>
          </div>
          
        </div>
        <div className="w-full lg:w-[35%]">
          <h1 className="text-[24px] lg:text-[32px] text-[#1D1D1F] pb-5 font-medium">Team</h1>
          <div className="flex gap-5 items-center pb-10">
            <img src={sola} alt="" className="h-[92px] w-[92px] lg:w-[144px] lg:h-[144px] object-cover" />
            <div className="flex flex-col gap-1">
              <p className="text-[#000] text-base lg:text-[24px] font-bold">Sola Oyeleke</p>
              <p className="text-[#777777] text-base">Engineer/Designer</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={juwon} alt="" className="h-[92px] w-[92px] lg:w-[144px] lg:h-[144px] object-cover" />
            <div  className="flex flex-col gap-1">
              <p className="text-[#000] text-base lg:text-[24px] font-bold">Juwon Oshindoro</p>
              <p className="text-[#777777] text-base">Engineer</p>
            </div>
          </div>
          
         
        </div>
      </div>
      
      <div className="text-center py-5 text-[10px] lg:text-[14px]">
        <Footer />
      </div>
      
    </div>
  )
}

export default About
