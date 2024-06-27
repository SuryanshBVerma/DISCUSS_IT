import { Box } from "@chakra-ui/react";
import FeedbackCard from "./FeedbackCard";
import { Carousel } from "nuka-carousel";
const feedback = [
  {
    id: "feedback-1",
    content: "The ability to create and join subject-specific communities makes it easy to find relevant discussions and connect with like-minded peers.",
    name: "Anurag Sarmah",
    title: "Computer Science Student",
    img: "https://media.licdn.com/dms/image/D4D03AQEkPdKT_ih5JQ/profile-displayphoto-shrink_800_800/0/1689954629401?e=1718841600&v=beta&t=-8PIVXmwZ-q9Sowv8q3hvNN9UyxTDvvRqC235gdykpo",
  },
  {
    id: "feedback-2",
    content: "I love the feature that allows me to share code snippets and get feedback from others. It's been a game-changer for my programming assignments.",
    name: "Chiranjeev Sehgal",
    title: "Engineering Student",
    img: "https://media.licdn.com/dms/image/D5603AQGvZ8EHc2Bo2A/profile-displayphoto-shrink_400_400/0/1710177727789?e=1718841600&v=beta&t=pVhqWshoPmG6n5E2UJq_ix7xP4ycMzJLljWdDQaZbaE",
  },
  {
    id: "feedback-3",
    content: "The ability to create polls and get instant feedback from the community has been invaluable for gathering insights on various topics.",
    name: "Shubham Mishra",
    title: "MCA Student",
    img: "https://media.licdn.com/dms/image/D5603AQHL95Du5Dui0g/profile-displayphoto-shrink_400_400/0/1714510971365?e=1720051200&v=beta&t=HCLIiux6YhA-CYoRJDYlyY2p9PqYLvRJi0ICTdDevng"
  },
];
const Testimonials = () => (
  <Box mx={20} bg={"black"} borderRadius={"xl"}
  fontFamily={"outfit"}>
    <section
      id="clients"
      className={`py-4 px-10 flex justify-center items-center flex-col relative `}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h2
          className={`font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full`}
        >
          What People are <br className="sm:block hidden" /> saying about us
        </h2>
        <div className="w-full md:mt-0 mt-6">
          <p
            className={`font-poppins font-normal text-white text-[18px] leading-[30.8px] text-left max-w-[450px]`}
          >
             Connect with peers, share knowledge, and unlock your academic potential through engaging discussions and collaborative learning.
          </p>
        </div>
      </div>
      <Carousel autoplay autoplayInterval={3000} wrapAround={true}>
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </Carousel>
    </section>
  </Box>
);

export default Testimonials;
