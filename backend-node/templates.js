// Rich collection of review templates categorized by type and tone
const REVIEW_TEMPLATES = {
  restaurant: {
    casual: [
      "The food at {name} is seriously good. Went with a few friends and everyone loved what they ordered. Nice relaxed vibe, prompt service, and the prices are very reasonable.",
      "Had dinner at {name} and I'm still thinking about that meal. Great portions, incredibly fresh ingredients, and the dessert was next level. Definitely a solid spot for a casual night out.",
      "{name} is our new favorite local spot. Good food, friendly staff, fair prices — honestly, what more do you need? The atmosphere is perfect for families too.",
      "Dropped by {name} on a whim and so glad we did. The menu has something for everyone, the atmosphere is chill, and the servers were super helpful with recommendations.",
      "Really enjoyed the food at {name}. Service was quick, the seating was comfortable, and the menu selection was great. Definitely will be coming back here again soon!",
      "I've been to {name} a couple of times now and the quality is always consistent. The burgers are juicy, the fries are crispy, and the staff is genuinely friendly.",
      "Perfect spot to grab a bite. {name} has a wonderful cozy charm, quick service, and delicious food that doesn't break the bank. Highly recommend the daily specials.",
      "Had a really nice lunch at {name}. The outdoor seating was lovely, the sandwiches were packed with flavor, and the drinks were refreshing. Perfect midday stop.",
      "Always a reliable choice for a quick and tasty dinner. The staff at {name} are always super welcoming, and the street tacos are absolutely stellar.",
      "Highly recommend checking out {name}. The casual atmosphere makes it great for unwinding, and the portions are large enough that you'll likely have leftovers."
    ],
    formal: [
      "Dining at {name} was an exemplary culinary experience. Each course was prepared with evident skill and presented with artistic precision. The staff is highly knowledgeable and attentive.",
      "I am pleased to recommend {name} as a dining destination of the highest order. The menu demonstrates a masterful understanding of flavor profiles and premium ingredients.",
      "{name} consistently delivers an exceptional dining experience. The quality of ingredients is superb, the wine list is carefully curated, and the execution is flawless from start to finish.",
      "The service at {name} was impeccable and the ambiance refined. An outstanding choice for business dinners, special celebrations, or anyone appreciating fine gastronomy.",
      "From the elegant table settings to the sophisticated flavor combinations, {name} represents the pinnacle of fine dining in the area. A truly remarkable evening.",
      "We were thoroughly impressed by the culinary craftsmanship at {name}. The attention to detail in both service and presentation created an unforgettable dining experience.",
      "The sophisticated atmosphere at {name} is matched only by the excellence of its kitchen. Every dish was executed to perfection, showing great culinary discipline.",
      "For those seeking a refined and sophisticated meal, {name} is the premier choice. The service is unobtrusive yet highly attentive, and the cuisine is top-tier.",
      "An outstanding establishment where gastronomy is elevated to an art form. The tasting menu at {name} was beautifully composed, balanced, and memorable.",
      "The dedication to culinary excellence at {name} is apparent in every detail. The sommelier provided exceptional recommendations that paired perfectly with our courses."
    ],
    enthusiastic: [
      "The food at {name} is absolutely DIVINE!! Every single dish was bursting with flavor and the presentation was GORGEOUS! 11/10 would eat here every single day! ⭐⭐⭐⭐⭐",
      "OH MY GOODNESS!! {name} is hands down the BEST restaurant I've ever been to!! The creative menu, energetic vibes, and amazing hospitality blew me away!",
      "BEST. DINING. EXPERIENCE. EVER!! {name} absolutely knocked it out of the park! The flavors are mind-blowing, and the staff treated us like royalty!",
      "I literally cannot stop raving about {name}! The taste, the service, the music, the mocktails - absolutely everything was flawless! Do yourself a favor and visit ASAP! 🎉🔥",
      "Wow, just wow! {name} completely exceeded my expectations! The atmosphere is electric, the food is mouth-watering, and the desserts are out of this world! ❤️",
      "Absolute perfection! {name} has officially won my heart. The dishes are so unique and flavorful, and the staff's passion for great food really shows!",
      "If you haven't been to {name} yet, you are seriously missing out! The food is legendary, the portion sizes are huge, and the service is incredibly fast and friendly! 🌟",
      "An absolute flavor explosion! {name} is a masterpiece of a restaurant. Every bite was pure bliss, and the cocktails were masterfully crafted!",
      "Oh my god, the cheese sauce here is absolutely legendary! {name} is a total game-changer. I am recommending it to literally everyone I know! 🧀🔥",
      "I am completely blown away! {name} serves the most delicious, mouth-watering dishes I have ever tasted! The energy here is so fun and vibrant!"
    ],
    critical: [
      "Disappointing dining experience at {name}. The service was extremely slow, and the food was cold by the time it was served. Very underwhelming.",
      "I had high expectations for {name}, but the meal was average at best. The pricing felt way too high for the quality of food and service we received.",
      "The service at {name} was lacking today. We had to wait over 45 minutes for our entrees, and the staff was rather inattentive. Room for improvement.",
      "Average quality and limited options. {name} has a decent atmosphere, but the main courses lacked seasoning and flavor.",
      "Unfortunately, my visit to {name} was not pleasant. The tables were crowded, the noise level was too high, and the dessert tasted stale."
    ]
  },
  hotel: {
    casual: [
      "Honestly, {name} was such a vibe! Super clean rooms, chill staff, and the location is perfect for exploring the area. Would totally stay here again.",
      "Just got back from my stay at {name} and had a great time. The bed was like sleeping on a cloud, and the breakfast buffet had plenty of solid options.",
      "Spent the weekend at {name} and it was exactly what I needed. Easy check-in process, comfy rooms, and a great pool area to relax by. Good value for money.",
      "Very decent stay at {name}. Friendly service at the front desk, clean facilities, and it's located close to public transit. Perfect for a quick weekend getaway.",
      "We had a lovely, hassle-free stay at {name}. The room was quiet, the Wi-Fi was fast, and the staff was always happy to help with local recommendations.",
      "Nice, cozy hotel with all the essentials. {name} has a great lobby lounge, comfortable rooms, and very accommodating service. No complaints at all!",
      "I was pleasantly surprised by {name}. The price was very reasonable, the room was spotless, and the bed was super comfortable. Will definitely book again.",
      "A great option for business travelers or tourists alike. {name} offers clean, quiet rooms, friendly service, and a convenient location close to key spots.",
      "Had a really nice stay at {name}. The check-in was fast, the parking was easy, and the room had a nice view of the courtyard. Highly recommend.",
      "A solid choice if you're visiting the city. The rooms at {name} are neat and spacious, and they have a free coffee station in the lobby which is great."
    ],
    formal: [
      "I had the privilege of staying at {name} recently, and the experience was truly exemplary. The accommodations were impeccably maintained, and the service was professional.",
      "{name} represents the gold standard in hospitality. From the seamless arrival experience to the meticulously appointed rooms, every detail is handled with care.",
      "My stay at {name} was characterized by outstanding service, sophisticated amenities, and a quiet, professional environment ideal for business travel.",
      "With its elegant architecture, high-end amenities, and exceptionally trained concierge staff, {name} delivers a premium lodging experience of the highest tier.",
      "The level of professionalism and attentiveness displayed by the staff at {name} was superb. The rooms are spacious, well-appointed, and offer complete comfort.",
      "A magnificent establishment. {name} offers refined luxury, peaceful surroundings, and a commitment to guest satisfaction that is visible in every department.",
      "For a sophisticated and relaxing stay, {name} is unmatched. The executive lounge, fitness center, and in-room technology are all of superior quality.",
      "We were thoroughly impressed by the exemplary standards of service at {name}. The staff went above and beyond to ensure our conference stay was perfect.",
      "I highly recommend {name} for corporate events and luxury stays. The meeting facilities are state-of-the-art and the catering service is outstanding.",
      "An exceptionally well-managed hotel. {name} provides an atmosphere of quiet elegance, with staff that are highly attentive yet respectful of privacy."
    ],
    enthusiastic: [
      "OMG {name} is AMAZING!! The rooms are absolutely gorgeous, the staff are the absolute sweetest, and I literally did not want to check out! 100% recommended! 🏨✨",
      "I am completely OBSESSED with {name}!!! Everything from the stunning lobby to the room views was pure perfection. Hands down the best hotel stay of my life!",
      "Absolute paradise! {name} exceeded all my expectations! The pool is beautiful, the room service is fast, and the staff makes you feel so special! 🌟💖",
      "What an incredible experience! {name} is beautiful, clean, and has the most fun atmosphere. The breakfast was legendary and the service was top-notch! 😍",
      "I can't say enough good things about {name}! The design is gorgeous, the beds are super cozy, and the location is unbeatable! Will definitely be back!",
      "Best vacation ever thanks to {name}! The amenities are top-tier, the rooms are pristine, and the views are absolutely breathtaking! 10/10!",
      "If you're looking for the ultimate staycation, {name} is the place to be! The service is outstanding, the vibes are perfect, and the spa is heaven! 🌸⭐",
      "Phenomenal hotel! {name} is a total gem. The staff was incredibly welcoming, the rooms were super modern, and the rooftop view was unforgettable!",
      "I am absolutely blown away by {name}!! The service is insanely fast, the beds are like clouds, and the views are just gorgeous! Best trip ever! 🎉🏨",
      "Simply outstanding! {name} has the best staff, the coolest design, and the location is perfect! I am already planning my next trip back here! ❤️"
    ],
    critical: [
      "Disappointing stay at {name}. The room was not properly cleaned, the Wi-Fi was slow and unstable, and the front desk staff was rather unhelpful.",
      "My experience at {name} was far from satisfactory. The room was noisy due to street traffic, the air conditioning was loud, and the breakfast options were cold.",
      "Not worth the price. {name} has a decent lobby, but the rooms are outdated and the bathroom had plumbing issues. Housekeeping was also slow to respond.",
      "Average accommodations. {name} is fine for a quick overnight stay, but the service was lackluster and the pool area was closed for maintenance.",
      "Very disappointed with the service at {name}. Check-in took over 30 minutes, our reservation was initially misplaced, and the room felt cramped."
    ]
  },
  cafe: {
    casual: [
      "Love grabbing coffee at {name}. Super chill atmosphere, friendly baristas, and the pastries are always fresh. Great spot to catch up on some reading.",
      "Great spot to work or hang out. The coffee is top-notch, the Wi-Fi is fast, and the staff at {name} are always welcoming and quick with orders.",
      "My daily go-to is {name}. Quick service, excellent espresso, and a really cozy seating setup. The avocado toast is also highly recommended!",
      "Nice little neighborhood gem. {name} makes a fantastic iced latte, and their freshly baked muffins are absolutely delicious. Highly recommend stopping by.",
      "Really cozy vibes at {name}. It's a great place to meet up with a friend or do some work. The staff is friendly and the tea selection is wonderful.",
      "Always a great experience at {name}. The atmosphere is relaxed, the background music is at the perfect volume, and the coffee is brewed to perfection.",
      "Found this place by accident and now I'm a regular. {name} has excellent cold brew, friendly service, and a beautiful outdoor patio.",
      "The perfect spot for a weekend morning. {name} offers delicious pastries, great specialty coffees, and a relaxed environment to start your day.",
      "Really love the setup at {name}. The staff are always smiling, and the chai latte is one of the best I've ever had. Very cozy spot.",
      "A great place to grab a quick coffee before work. The service at {name} is always speedy, and the bagels are toasted just right."
    ],
    formal: [
      "{name} offers a refined coffee experience. The selection of single-origin beans and the precise brewing methods demonstrate a commitment to coffee craft.",
      "The sophisticated atmosphere at {name} makes it an ideal venue for morning business meetings or quiet, focused work. The service is highly professional.",
      "An exceptional establishment for coffee connoisseurs. {name} provides meticulously prepared beverages and high-quality artisanal pastries in an elegant setting.",
      "The attention to detail in the brewing process at {name} is highly commendable. The seating is comfortable and the environment is quiet and professional.",
      "A distinguished cafe with an upscale environment. {name} consistently delivers excellent service, premium teas, and sophisticated light bites.",
      "For those who appreciate the finer details of espresso extraction, {name} is the premier choice. The staff is polite, and the setting is impeccably clean.",
      "{name} stands out for its high-quality coffee selection and refined ambiance. Ideal for professionals looking for a premium café experience.",
      "The service at {name} is prompt and polite, and the product quality is excellent. A highly recommended spot for business discussions over coffee.",
      "We had a productive morning meeting at {name}. The quiet atmosphere and professional service provided an excellent environment for discussion.",
      "An elegant space dedicated to the appreciation of fine coffee. {name} offers rare bean varieties prepared with expert precision."
    ],
    enthusiastic: [
      "BEST COFFEE EVER! {name} has the absolute friendliest staff and the vibes are unmatched! My absolute favorite spot in the city! ☕🔥",
      "I am completely in love with {name}! The matcha latte is to die for, the pastries are heavenly, and the aesthetic is absolutely beautiful! 10/10! 😍✨",
      "Oh my goodness, the waffles at {name} are out of this world! The coffee is super smooth and the baristas are always smiling! Highly recommend! ❤️🥞",
      "My new favorite obsession! {name} has the coolest interior design, incredible coffee, and the most delicious sweet treats! Absolutely love it!",
      "If you're a coffee lover, you NEED to visit {name}! The espresso is top-tier, the music is great, and the atmosphere is so uplifting! ⭐",
      "Absolute perfection in a cup! {name} knows exactly how to make a perfect flat white. The staff is super passionate and the energy here is amazing! 🌟",
      "Everything about {name} is top-notch! The staff, the drinks, the aesthetic - it's a dream come true for anyone who loves cafes! 💖",
      "I could spend all day at {name}! The pastries are baked to perfection and the iced drinks are refreshing and delicious! ☕🎉",
      "THE BEST CHAI LATTES ON EARTH! {name} has won my heart completely! The vibes are so good and the staff is so friendly! 😍✨",
      "Oh my god, you have to try the avocado toast here! {name} is doing something incredible. Super fast service and amazing energy! 🥑🔥"
    ],
    critical: [
      "The coffee at {name} was burnt and bitter. The service was extremely slow, and the barista seemed rather rude. Won't be returning.",
      "Disappointing visit to {name}. The seating is very cramped, the Wi-Fi was not working, and the pastries tasted stale.",
      "Average coffee and overpriced. {name} has a nice interior, but the service was lackluster and it took 20 minutes just to get a simple latte.",
      "Not the best spot to work. The background music at {name} was way too loud, and they don't have enough power outlets.",
      "Unfortunately, my experience at {name} was poor. The tables were dirty, the staff was unorganized, and my order was incorrect."
    ]
  },
  salon: {
    casual: [
      "Had a great experience at {name}. The staff was friendly, listened to exactly what I wanted, and did an excellent job. Clean and comfortable space.",
      "Always a reliable spot for a cut and style. The facilities are clean, booking an appointment is easy, and {name} never disappoints.",
      "Very relaxing visit to {name}. Got exactly the style I was looking for, and the conversation was great. Will definitely return.",
      "Really nice service at {name}. The prices are reasonable, the staff is welcoming, and the salon has a very clean and cozy environment.",
      "Got my hair done at {name} and I'm very happy with the results. The stylist was experienced and gave great tips on hair care.",
      "Highly recommend {name}. The salon is neat, the staff is polite, and they make sure you are comfortable throughout your entire appointment.",
      "A great neighborhood salon. {name} has a relaxed atmosphere, friendly stylists, and they always do a professional job on my hair/nails.",
      "Very satisfied with my visit to {name}. The service was prompt, the staff was attentive, and the results were exactly what I hoped for.",
      "Had a really nice pedicure at {name} today. The massage chairs were great and the staff was extremely friendly.",
      "A solid local spa. {name} has a great selection of facial treatments and the pricing is very reasonable."
    ],
    formal: [
      "The service at {name} is highly professional and meticulously executed. I am extremely satisfied with the level of care and attention to detail.",
      "An upscale salon experience of the highest order. {name} provides outstanding treatments in an atmosphere of quiet, refined sophistication.",
      "The stylists at {name} demonstrate superior technique and professional expertise. The environment is spotless, and the service is exemplary.",
      "For premium hair and beauty treatments, {name} is highly recommended. The staff is polite, professional, and highly skilled in their craft.",
      "A truly professional establishment. {name} offers high-end services using premium products in a quiet and relaxing atmosphere.",
      "My appointment at {name} was handled with the utmost professionalism. The consultation was thorough and the execution was flawless.",
      "The standards of hygiene and customer service at {name} are impeccable. An excellent choice for anyone seeking high-quality salon services.",
      "We highly appreciate the professional standards and polite staff at {name}. The services provided are consistently of the highest quality.",
      "An outstanding establishment for advanced skincare and beauty therapies. The practitioners at {name} exhibit great clinical professionalism.",
      "The technical execution of the color services at {name} is exceptional. The results are natural, durable, and highly sophisticated."
    ],
    enthusiastic: [
      "I feel like a brand new person! The team at {name} is incredibly talented, super sweet, and absolutely nailed my look! LOVE IT! 💇‍♀️💖",
      "OMG! {name} is the absolute best salon in town! I've never been happier with my hair. They are absolute magicians! 🌟✨",
      "The absolute BEST pampering session ever! {name} is gorgeous, the staff is so friendly, and my hair looks absolutely stunning! 10/10! 😍❤️",
      "I am obsessed with my new look! The stylists at {name} are true artists and the whole experience was super relaxing and fun! 🌸🎉",
      "An absolute dream of a salon! {name} has the best vibes, the staff makes you feel like a star, and the quality of work is outstanding! ⭐",
      "If you want to look and feel amazing, you need to book an appointment at {name} immediately! Absolutely phenomenal service! 💇‍♀️🔥",
      "Best salon experience of my life! {name} has the most talented stylists, the service is top-notch, and the salon itself is beautiful! 💖🌟",
      "Unbelievable results! {name} exceeded all my expectations. The staff is incredibly knowledgeable and they make the experience so special! 😍",
      "THE SHAMPOO MASSAGE WAS HEAVEN! I am absolutely in love with {name}! The staff is so sweet and the salon is beautiful! 💆‍♀️✨",
      "Oh my god, the nail art here is to die for! {name} has the absolute best selection and the coolest stylists! 💅🔥"
    ],
    critical: [
      "Poor haircut experience at {name}. The stylist did not listen to what I wanted and cut it way too short. Unprofessional service.",
      "I went to {name} for a hair coloring and it turned out completely uneven. The staff was dismissive when I brought it up. Very disappointed.",
      "Not worth the price. The salon was messy, the towels did not smell fresh, and my appointment started 25 minutes late.",
      "Average styling and subpar customer care. {name} charges premium prices but does not deliver premium service. The environment is noisy.",
      "Very disappointed with my nail service at {name}. The polish started chipping the next day and the technician was in a rush."
    ]
  },
  hospital: {
    casual: [
      "Had to visit {name} and was pleasantly surprised by how nice the staff was. The waiting room was comfortable and clean, and the doctor explained everything in simple terms.",
      "Very neat clinic. {name} has helpful receptionist staff and the doctors don't rush you. Easy to schedule an appointment.",
      "Really good care at {name}. The nurses were very attentive and made sure I was comfortable during my stay.",
      "Nice clinic with a very clean setup. {name} has friendly doctors who take the time to answer all your questions.",
      "Had a quick checkup at {name}. The wait time was short, the staff was polite, and the parking was easy.",
      "The medical team at {name} is great. Very supportive and friendly, and they made a stressful visit much easier.",
      "A very reliable local clinic. {name} is kept spotless, and the service from checkout to prescription is very smooth.",
      "I had a positive experience at {name}. The staff was incredibly caring, and the wait times were very reasonable.",
      "Always clean and quiet. {name} has friendly nurses and professional medical staff who make you feel safe.",
      "A great neighborhood clinic. The doctors at {name} are very compassionate and the administrative process is straightforward."
    ],
    formal: [
      "The medical care rendered at {name} was of the highest clinical and professional standard. The facilities are impeccably maintained.",
      "I highly recommend {name} for their state-of-the-art medical equipment, highly qualified physicians, and professional patient care.",
      "The administration and clinical staff at {name} execute their duties with exceptional efficiency and professional courtesy.",
      "For comprehensive healthcare services in a quiet, hygienic, and highly organized environment, {name} is an exemplary institution.",
      "My treatment at {name} was managed with outstanding clinical expertise. The nursing staff was highly professional and attentive.",
      "A distinguished medical facility. {name} demonstrates a superior commitment to clinical standards, safety, and patient satisfaction.",
      "The diagnostic and treatment services at {name} are executed with great precision. The consultations are detailed and thorough.",
      "We were thoroughly impressed by the high standards of sanitation and the quiet, professional environment at {name}.",
      "The physicians at {name} are highly knowledgeable, providing clear and structured guidance regarding patient therapy.",
      "The patient intake and billing processes at {name} are managed with exemplary professional dispatch and clarity."
    ],
    enthusiastic: [
      "The staff at {name} is absolutely AMAZING! They took such good care of me and made me feel so comfortable! 10/10 care! ❤️🏥",
      "OH MY GOSH! I have never seen such a clean and beautiful clinic! The doctors at {name} are real life heroes! Absolutely spectacular! 🌟✨",
      "THE BEST MEDICAL EXPERIENCE EVER! The nurses at {name} are absolute angels, and the treatment was fast and painless! Thank you so much! 😍",
      "I am so grateful for the team at {name}! They went above and beyond to make sure my recovery was fast and comfortable! Highly recommend! 💖",
      "Simply phenomenal care! {name} has the friendliest team, the most modern facilities, and they treat you like family! ⭐⭐⭐⭐⭐",
      "Wow! {name} completely changed my view of hospitals. Outstanding customer service, super sweet doctors, and beautiful design! 🌸",
      "If you need a clinic, go to {name} immediately! The medical team is so talented and they make the process so easy and stress-free! 🌟",
      "Absolute gold standard! {name} is pristine, high-tech, and has the most energetic and supportive staff on earth! 🔥🏥",
      "I am in love with the pediatric department at {name}! They were so sweet with my kids and made them feel completely safe! 👶❤️",
      "Incredible experience! The doctors at {name} are so knowledgeable and their bedside manner is absolutely stellar! 🌟🎉"
    ],
    critical: [
      "Extremely long wait times at {name}. The administrative staff was unhelpful, and the billing department made multiple errors on our statement.",
      "The clinical service at {name} was disappointing. The doctor spent less than three minutes with me and dismissed my concerns.",
      "Poor communication and unorganized facilities. The appointment system at {name} is highly inefficient, leading to massive delays.",
      "The patient rooms at {name} were not properly maintained, and the nursing staff was slow to respond to calls. Needs improvement.",
      "Unsatisfactory medical consultation at {name}. The staff was uncoordinated and the clinic felt chaotic."
    ]
  },
  nail_salon: {
    casual: [
      "Got my nails done at {name} and they look great. The nail artists were very friendly and they have a huge selection of colors to choose from.",
      "Always a reliable spot for a manicure. Clean tools, comfortable chairs, and the team at {name} is always welcoming.",
      "Very neat nail studio. The pricing at {name} is fair and the pedicure was very relaxing. Will certainly return.",
      "Nice nail salon with a very cozy, relaxed vibe. The staff at {name} did a great job on my gel manicure.",
      "Really enjoyed my visit to {name}. The staff is friendly, the salon is clean, and the nail art is super cute.",
      "A great neighborhood nail spot. They take their time to do a clean job, and {name} never disappoints.",
      "Very satisfied with my manicure at {name}. The service was prompt and the staff made sure I was comfortable.",
      "Clean facility and easy scheduling. {name} has friendly nail technicians who listen to what you want.",
      "Really nice selection of polish colors. {name} is clean, comfortable, and the staff is very polite.",
      "Had a relaxing manicure and pedicure at {name}. The staff is friendly and they did a very neat job."
    ],
    formal: [
      "The manicure and nail care services at {name} are executed with great technical precision and strict adherence to hygiene standards.",
      "An upscale nail studio offering premium treatments in a quiet, refined, and spotlessly clean environment.",
      "The nail technicians at {name} demonstrate superior craftsmanship and professional conduct. Highly recommended.",
      "For high-quality gel extensions and meticulous nail care, {name} is an exemplary establishment. The staff is polite.",
      "The standards of sanitation and product quality at {name} are outstanding. I am highly satisfied with the professional level of care.",
      "My appointment at {name} was handled with great professional courtesy. The tools were opened from sterile packs, which is commendable.",
      "The service at {name} is prompt, organized, and executed with quiet professionalism. The results are highly polished.",
      "We highly appreciate the quiet environment and the professional technical skills of the nail artists at {name}.",
      "A distinguished beauty establishment. {name} provides outstanding nail treatments using premium, non-toxic products.",
      "The client management and technical execution at {name} are consistently of the highest standard. Excellent service."
    ],
    enthusiastic: [
      "I am OBSESSED with my nails! The nail art at {name} is absolutely stunning! They are true artists! 💅✨💖",
      "OMG! {name} is the absolute best nail salon ever! The colors are gorgeous and the team is so fun and sweet! 🌟😍",
      "THE BEST MANICURE OF MY LIFE! {name} completely knocked it out of the park! The design is flawless! 10/10! 🌸🎉",
      "I feel like a queen! {name} has the most beautiful studio, the friendliest staff, and my nails look absolutely spectacular! ⭐⭐⭐⭐⭐",
      "Simply phenomenal! The gel polish at {name} lasts forever and the nail art is so creative! Love, love, love it! ❤️💅",
      "Absolute perfection! The pedicures at {name} are pure bliss, and the vibes are so relaxing and fun! 🌟💖",
      "If you want to gorgeous nail art, you must visit {name}! The team is incredibly talented and so sweet! 😍✨",
      "Wow! My nails have never looked this beautiful. {name} is a total gem of a salon. Highly, highly recommended! 💎🔥",
      "I am in love with this place! {name} has the coolest nail designs, great music, and the friendliest staff! 💅🎉",
      "An absolute masterpiece! The team at {name} is so detailed and creative. My nails look like a work of art! 🌟🚀"
    ],
    critical: [
      "Very poor service at {name}. The technician rushed through my manicure and cut one of my cuticles, which bled. Ouch.",
      "Disappointing gel manicure. The polish began lifting and chipping within 48 hours of leaving the salon. Waste of money.",
      "The salon at {name} was messy and the pedicure tubs did not look properly sanitized. The staff was rather unfriendly.",
      "Overpriced for simple work. The nail shaping at {name} was uneven and the technician did not do the design I requested.",
      "Poor client scheduling. I had an appointment but was made to wait 30 minutes, and the manicure was rushed."
    ]
  },
  service: {
    casual: [
      "Had a wonderful experience with {name}. The team was very friendly, helpful, and got the job done nicely and on time. Highly recommend.",
      "Highly recommend {name} for their great customer service, straightforward pricing, and reliable work. Very pleasant to deal with.",
      "Very professional and easy to deal with. {name} did a fantastic job, communicated clearly, and I will certainly use their services again.",
      "Great experience from start to finish. {name} has a helpful team, fair pricing, and they made sure everything was completed to my satisfaction.",
      "A very reliable and friendly business. {name} took care of everything quickly and efficiently. Appreciate the great service!",
      "Really glad I chose {name}. The service was prompt, the staff was polite, and the pricing was clear with no hidden fees.",
      "Excellent customer service and solid work. {name} is dependable, friendly, and very easy to communicate with. Will use again.",
      "Very happy with the service provided by {name}. They were on time, did a clean job, and the staff was extremely courteous.",
      "Had a great experience working with {name} today. The project was completed on time and the team was extremely friendly.",
      "A solid local business. {name} has a great team and their services are offered at very reasonable rates."
    ],
    formal: [
      "The service rendered by {name} was of the highest professional standard. I commend their dedication, efficiency, and clear communication.",
      "I would highly recommend {name} for their exemplary professionalism, reliable communication, and prompt delivery of services.",
      "The team at {name} demonstrated outstanding expertise and professional conduct throughout our engagement. A highly reliable partner.",
      "For efficient, professional, and high-quality service, {name} is highly recommended. Their attention to client needs is exemplary.",
      "An exceptionally professional business. {name} delivers excellent results with clear documentation and polite customer support.",
      "We were thoroughly impressed by the high standards of execution and professional communication maintained by {name}.",
      "{name} consistently provides reliable, high-caliber services. Their staff is knowledgeable, polite, and dedicated to excellence.",
      "I am pleased to write this recommendation for {name}. Their work is characterized by thoroughness, professionalism, and integrity.",
      "An outstanding organization for consulting and technical support. The technicians at {name} exhibit great professional diligence.",
      "The execution of the contract services by {name} was exceptional. The project was completed within budget and to high specifications."
    ],
    enthusiastic: [
      "Absolutely FANTASTIC service from {name}! They went above and beyond in every way possible! Will definitely use them again! 10/10! 🌟🔥",
      "Unbelievably great experience! The team at {name} is top-tier and their quality of work is outstanding! 100% recommended to everyone! 😍🙌",
      "Wow, just wow! {name} completely blew me away with their incredible customer service and quick work! Absolutely amazing! ❤️🎉",
      "I cannot recommend {name} enough! They are extremely friendly, super fast, and do high-quality work with a smile! Best service ever! ⭐💖",
      "Outstanding experience! {name} is absolute perfection. They are professional, friendly, and deliver results that exceed expectations! 🌟",
      "If you need this service, do not hesitate to contact {name}! They are absolute legends and did a spectacular job for us! 😍🎉",
      "Amazing team and spectacular results! {name} made the whole process super easy, stress-free, and fun! Love their energy! 💖⭐",
      "Absolutely brilliant! {name} did an amazing job and their customer support is the friendliest I've ever encountered! 10/10! 🔥🌟",
      "THE BEST CUSTOMER EXPERIENCE OF MY LIFE! I am absolutely in love with {name}! The staff is so sweet and the results are beautiful! 😍✨",
      "Oh my god, the quality here is to die for! {name} has the absolute best team and the coolest support channels! 🛠️🔥"
    ],
    critical: [
      "Poor service quality from {name}. The technician arrived late, did not finish the job properly, and left a mess behind. Highly disappointed.",
      "Unreliable communication and uncompleted work. {name} promised to resolve our issue but has been ignoring our emails for a week.",
      "Overpriced and unprofessional. The pricing was much higher than quoted, and the technician was extremely dismissive of our requests.",
      "Subpar results. The work done by {name} failed within a week, and they refused to honor their service warranty.",
      "Very unorganized team. It took three visits from {name} to fix a simple issue, wasting a massive amount of our time."
    ]
  },
  store: {
    casual: [
      "Great selection of products and friendly service at {name}. Found exactly what I was looking for quickly and at a decent price.",
      "Nice clean shop with helpful staff. The prices are reasonable, the aisles are easy to navigate, and shopping at {name} is always easy.",
      "Good variety of items at {name}. The staff is polite, the checkout process was smooth and efficient, and there is plenty of parking.",
      "Always a good experience shopping at {name}. They have a reliable selection, clean facilities, and the staff is happy to help find items.",
      "Really pleasant local store. {name} has a nice neighborhood feel, friendly cashiers, and carries a good mix of everyday essentials.",
      "I drop by {name} quite often and the customer service is always solid. The store is well-organized and the prices are fair.",
      "Great variety and convenient location. {name} is always neat, the shelves are well-stocked, and the staff is helpful and polite.",
      "A very reliable store for all your daily needs. {name} has friendly employees, a clean layout, and checkout is usually quick.",
      "Had a great shopping trip to {name} today. Found everything on my list and the staff was extremely friendly.",
      "A solid local retail shop. {name} has a great selection of household items and tools at very reasonable prices."
    ],
    formal: [
      "{name} provides a curated shopping experience with exceptional customer service and premium quality goods. Highly recommended.",
      "The inventory at {name} is excellently organized, and the staff demonstrates high product knowledge and professional courtesy.",
      "An outstanding retail establishment. {name} maintains high standards of cleanliness, merchandise display, and customer relations.",
      "For a quiet, organized, and high-quality shopping experience, {name} is the premier choice. The service is efficient and professional.",
      "The management and staff at {name} are to be commended for their professional service and commitment to customer satisfaction.",
      "A sophisticated retail store offering premium products. The staff at {name} is attentive and polite, providing excellent service.",
      "We were thoroughly impressed by the organization and quality of products at {name}. A highly professional and reliable business.",
      "The customer service at {name} is exemplary. The environment is professional, and the product selection is of superior caliber.",
      "An outstanding store for corporate gifts and premium products. The staff at {name} provides meticulous gift wrapping services.",
      "The inventory at {name} displays a high level of curation. The products are exceptional and the service is highly professional."
    ],
    enthusiastic: [
      "MY FAVORITE STORE! {name} has the absolute coolest items and the staff are always so helpful and fun! Highly, highly recommend! ⭐⭐⭐⭐⭐",
      "I could spend hours browsing at {name}! Incredible customer service, a fantastic product range, and such a fun shopping atmosphere! 🎉🛍️",
      "Wow! {name} is absolutely amazing! They have unique products you won't find anywhere else and the staff is incredibly sweet! 😍✨",
      "Best shopping experience ever! The team at {name} is so welcoming, the prices are great, and the selection is mind-blowing! ❤️🌟",
      "I am obsessed with {name}! The store has the best vibes, the staff is super helpful, and they always have new and exciting items! 💖",
      "Absolute gem of a store! {name} has won me over with their amazing customer service and high-quality products. Love it! 🛍️🔥",
      "If you haven't shopped at {name} yet, you are missing out on a shopping adventure! The staff is awesome and the store is beautiful! ⭐",
      "Everything about {name} is perfect! The layout, the staff, the products - I always leave with a smile and great purchases! 🎉😍",
      "THE COOLEST GIFTS EVER! I am absolutely in love with {name}! The staff is so sweet and the store is beautiful! 😍✨",
      "Oh my god, the items here are to die for! {name} has the absolute best selection and the coolest vibes! 🎁🔥"
    ],
    critical: [
      "Very poor customer service at {name}. The staff ignored me when I asked for assistance, and the checkout line was incredibly long.",
      "Disappointing product selection. Many of the shelves at {name} were empty, and the items in stock were overpriced.",
      "Not a pleasant shopping experience. The store was unorganized, items were placed in incorrect sections, and the floor was dirty.",
      "Overpriced and subpar quality. The item I purchased from {name} broke within two days, and they refused to issue a refund.",
      "Unhelpful store associates. Nobody knew where specific items were located, and the checkout clerk was rather rude."
    ]
  },
  grocery: {
    casual: [
      "Love shopping at {name}. The produce is always fresh, the aisles are clean and organized, and the staff is helpful when you need to find something.",
      "Super easy grocery runs here. They have a good selection of organic products and the checkout lanes move pretty quickly. Very convenient.",
      "Great local grocery store. {name} has competitive prices, fresh bakery items, and a very clean layout. Highly recommend for weekly shopping.",
      "Always find exactly what I need at {name}. The deli section is particularly good, the parking lot is spacious, and the staff is polite.",
      "A reliable and clean supermarket. {name} offers a solid range of brands, good fresh seafood, and friendly cashiers who make checkouts pleasant.",
      "I do my weekly shopping at {name} and it's always a good experience. The shelves are well-stocked, and they have excellent sales on meat and produce.",
      "Very neat and well-maintained grocery store. {name} has a great selection of fresh fruits, a helpful customer service desk, and clean restrooms.",
      "A great neighborhood store. {name} has high-quality produce, a good cheese selection, and the employees are always polite and efficient.",
      "Had a quick grocery run at {name}. The checkout lines were short and the staff was very friendly. Produce was high quality.",
      "A solid local store with a great selection of everyday items. The shelves at {name} are always stocked and the prices are fair."
    ],
    formal: [
      "{name} consistently maintains high standards of sanitation, stock availability, and professional customer service. A highly reliable retail location.",
      "An exceptionally well-organized establishment. {name} offers a premium selection of organic, local, and specialty products for the discerning shopper.",
      "The inventory management and cleanliness at {name} are exemplary. The checkout process is efficient, and the staff exhibits professional courtesy.",
      "For high-quality fresh ingredients and a quiet, organized shopping environment, {name} is highly recommended. The meat and seafood selection is outstanding.",
      "{name} provides a superior grocery shopping experience. The aisles are spacious, the product labeling is clear, and the staff is highly attentive to customer needs.",
      "A professionally managed grocery store with an impressive range of international and organic items. {name} maintains excellent standards throughout.",
      "The quality control at {name} is highly impressive. The produce section is meticulously curated, and the staff is always polite and professional.",
      "We appreciate the high standards of cleanliness and the professional service at {name}. It is our preferred destination for premium ingredients.",
      "The management at {name} maintains an exemplary standard of retail organization. The store is clean, quiet, and highly efficient.",
      "An upscale market offering premium local and imported goods. {name} is highly recommended for those requiring specialized ingredients."
    ],
    enthusiastic: [
      "My absolute FAVORITE grocery store! {name} has the freshest organic produce and the customer service is unmatched! Love shopping here! 😍🛒",
      "I love shopping at {name}! They have so many hard-to-find international items, amazing fresh bread, and the staff are incredibly sweet and helpful! 🥖✨",
      "The best grocery store ever! The bakery at {name} is to die for, everything is super clean, and the checkout is incredibly fast! Highly recommend! 🌟❤️",
      "I am obsessed with the ready-to-eat section at {name}! So many delicious options, and the produce is always peak quality! Absolutely wonderful! 🎉",
      "Outstanding selection! {name} has completely transformed my weekly grocery runs. The staff is always so cheerful and the quality is amazing!",
      "A grocery shopper's dream! {name} is incredibly organized, has fantastic deals, and the produce section looks like a work of art! 10/10! 🍉💖",
      "I can't say enough good things about {name}! The staff goes out of their way to help, the selection is huge, and everything is super fresh! ⭐",
      "Absolutely top-tier! {name} is clean, well-stocked, and has a fantastic selection of specialty health foods. My go-to store forever! 🛒🔥",
      "THE BAKERY AT {name} IS HEAVEN! The warm croissants are out of this world and the staff is so friendly! 🥐😍",
      "Oh my god, you have to try the freshly squeezed orange juice here! {name} has the best selection and the nicest cashiers! 🍊🔥"
    ],
    critical: [
      "The produce at {name} was mostly bruised and overpriced. The checkout lines were extremely long, and only two registers were open.",
      "Poor inventory management. {name} is constantly out of basic grocery items, and the dairy section had expired milk on the shelves.",
      "Not a clean store. The aisles at {name} were cluttered, the meat counter smelled off, and the staff was unhelpful.",
      "Overpriced organics. The specialty items at {name} cost double compared to other stores, and the quality is rather mediocre.",
      "Disappointing customer service. The cashiers at {name} were indifferent and did not bag my items properly."
    ]
  },
  clothes: {
    casual: [
      "Really cool selection of clothes at {name}. The prices are fair, the quality is good, and the staff lets you browse in peace without hovering.",
      "Found some great pieces at {name} today. The store layout is clean, the fitting rooms are nice and spacious, and the checkout was quick.",
      "Good quality clothing at reasonable prices. {name} is always on my shopping list when I need a wardrobe update. Friendly staff too.",
      "Nice boutique with a good variety of styles. {name} has comfortable clothes, helpful customer service, and they run good seasonal sales.",
      "Really enjoyed my shopping experience at {name}. They have classic styles as well as trendy options, and the atmosphere is relaxed.",
      "Always a reliable spot for casual wear. {name} has soft fabrics, durable clothing, and the staff is always happy to help locate sizes.",
      "Great shopping experience. {name} is clean, organized by category, and has a wonderful collection of everyday outfits at decent prices.",
      "Really pleasant store. {name} offers nice options for both work and casual wear. The staff was polite and the checkout process was smooth.",
      "Had a great shopping trip to {name} today. Found two super comfortable sweaters and the staff was extremely friendly.",
      "A solid local boutique. {name} has a great selection of casual tees, jeans, and activewear at very reasonable prices."
    ],
    formal: [
      "{name} offers an elegant shopping environment with highly attentive staff, well-crafted fashion items, and exceptional customer service.",
      "A distinguished boutique. The fabrics and designs at {name} are of superior caliber, suitable for formal, professional, and luxury wardrobes.",
      "The customer service at {name} is exemplary. The consultants are highly knowledgeable about fit and styling, making for a refined experience.",
      "For high-quality materials and classic silhouettes, {name} is highly recommended. The store layout is sophisticated and the service is professional.",
      "{name} maintains an impressive inventory of elegant apparel. The quality of craftsmanship is evident in every garment, and the staff is polite.",
      "A premium clothing store with a focus on quality and fit. The staff at {name} provides tailored assistance in a quiet, sophisticated setting.",
      "The shopping experience at {name} is defined by professional service and premium quality garments. An excellent destination for formal attire.",
      "We were highly impressed by the curation of the wardrobe collections at {name}. The service was refined and the fitting rooms were comfortable.",
      "An outstanding boutique for professional and formal wear. The staff at {name} provides meticulous tailoring services to ensure a perfect fit.",
      "The collections at {name} display a high level of design sophistication. The fabrics are exceptional and the service is highly professional."
    ],
    enthusiastic: [
      "OH MY GOSH! I wanted to buy the whole store! {name} has the most fashionable clothes and the staff is so helpful and sweet! 👗✨",
      "Best clothing shopping experience ever! {name} has unique styles you won't find anywhere else! Absolutely obsessed with my new outfits! 💖🛍️",
      "I am in LOVE with this boutique! {name} has the absolute cutest clothes, the material is super high-quality, and the vibe is amazing! ⭐🌟",
      "Wow, what an incredible selection! {name} has officially become my favorite place to shop. The staff is so fun and helpful! 10/10! 🎉💃",
      "Absolutely gorgeous designs! {name} has the most stunning dresses and accessories. The customer service is top-tier and the shopping vibe is so fun!",
      "If you need a wardrobe makeover, you must visit {name}! The styles are fresh and trendy, and the staff will help you style the perfect look! ❤️",
      "So many compliments on the outfit I bought from {name}! The store is beautiful, the selection is curated perfectly, and I had the best time! 🌟",
      "A fashion lover's paradise! {name} is packed with beautiful, high-quality pieces. The shopping experience is always an absolute joy! 🛍️🔥",
      "THE COZIEST SWEATERS EVER! I am absolutely in love with {name}! The staff is so sweet and the store is beautiful! 😍✨",
      "Oh my god, the accessories here are to die for! {name} has the absolute best selection and the coolest vibes! 💍🔥"
    ],
    critical: [
      "Poor selection and cheap fabrics. The items at {name} looked nothing like the pictures online and felt low-quality. Overpriced.",
      "Disappointing customer service. The sales associates at {name} were following me around the store, making me feel very uncomfortable.",
      "The clothing sizes at {name} are very inconsistent, and they have a terrible return policy. Store credit only, which is frustrating.",
      "Outdated styles and unorganized racks. The store was messy, and finding a simple basic item was nearly impossible.",
      "The fitting rooms at {name} were dirty and did not have proper mirrors. Checkout took 15 minutes due to system errors."
    ]
  },
  gym: {
    casual: [
      "Really good gym. {name} has plenty of equipment, a very clean locker room, and the trainers are always helpful and friendly.",
      "Nice place to work out. Not too crowded during off-peak hours, and the members at {name} are generally respectful. Fair pricing.",
      "Very decent facility. {name} has a good variety of cardio machines, free weights, and they keep the equipment wiped down and clean.",
      "Love coming to {name} for my morning workouts. The staff is welcoming, the environment is motivating, and they have great group classes.",
      "A solid local gym. The showers are clean, the parking lot is big, and {name} offers great value for a basic monthly membership.",
      "Great equipment and relaxed atmosphere. {name} is perfect for anyone looking to get in a quick workout without any gym intimidation.",
      "Very clean gym with friendly staff. They have a good selection of machines and everything is kept in working order.",
      "I really enjoy the classes at {name}. The instructors are very supportive and the community vibe is extremely encouraging.",
      "Perfect neighborhood fitness center. Clean, quiet, and {name} has all the essentials you need for a good strength session.",
      "Had a great experience signing up at {name}. The staff was very straightforward about membership terms and the gym layout is great."
    ],
    formal: [
      "The training facilities and athletic equipment at {name} are of superior caliber, suitable for comprehensive physical conditioning.",
      "I highly recommend {name} for their highly qualified personal trainers, sanitary protocols, and premium health amenities.",
      "The management and coaching staff at {name} execute their duties with exceptional professionalism and dedication to member goals.",
      "For advanced physical training in a quiet, modern, and highly structured fitness environment, {name} is the premier choice.",
      "My fitness assessment and training program at {name} were handled with outstanding professional expertise and technical accuracy.",
      "A distinguished athletic facility. {name} demonstrates a superior commitment to cleanliness, equipment maintenance, and member safety.",
      "The group fitness instruction and personal training services at {name} are executed with great discipline and attention to form.",
      "We were thoroughly impressed by the premium locker room amenities and the quiet, professional atmosphere at {name}.",
      "The wellness consultants at {name} are highly knowledgeable, providing clear and structured guidance regarding nutrition and exercise.",
      "The membership enrollment and facility operations at {name} are managed with exemplary professional dispatch and customer care."
    ],
    enthusiastic: [
      "I ABSOLUTELY LOVE THIS GYM! {name} has the best energy, the most motivating music, and the trainers are incredible! 🏋️‍♂️💪🔥",
      "OMG! {name} is hands down the best fitness center in town! The equipment is brand new and the vibes are electric! 🌟✨",
      "THE BEST WORKOUT OF MY LIFE! The group classes at {name} are absolute fire! High energy, amazing community, and incredible results! 10/10!",
      "I am officially obsessed with {name}! The staff goes out of their way to support you, and the smoothie bar is legendary! 🥤💖",
      "Simply phenomenal facility! {name} has everything you need to crush your goals and the coaches are so energetic and fun! ⭐⭐⭐⭐⭐",
      "Wow! The community at {name} is so supportive and welcoming. The energy in the building makes you want to push harder! 🚀🔥",
      "If you want to get fit and have fun, join {name} immediately! The classes are amazing and the team is so inspiring! 😍🌟",
      "Absolute gold standard for fitness! {name} is pristine, packed with premium gear, and the trainers are true professionals! 💪❤️",
      "I am in love with the steam room and sauna at {name}! Perfect recovery after a brutal workout! Best gym ever! 🌟",
      "Incredible atmosphere! The trainers at {name} are so encouraging and their passion for fitness is totally contagious! 🎉🏋️‍♂️"
    ],
    critical: [
      "Many of the cardio machines at {name} are broken and have 'out of order' signs for weeks. The locker rooms smell like mold.",
      "Extremely crowded during peak hours, and the gym staff does not enforce wiping down equipment. Very unhygienic environment.",
      "The membership cancellation process at {name} is a complete scam. They keep charging your card even after cancellation.",
      "Lackluster facilities. The air conditioning was broken during summer, making workouts unbearable, and the staff was indifferent.",
      "Unfriendly trainers and unhelpful front desk. {name} has high rates but the amenities are outdated and poorly maintained."
    ]
  },
  real_estate: {
    casual: [
      "Had a great experience working with {name}. The agents were very friendly, listened to what we wanted, and helped us find a nice home quickly.",
      "Very helpful agency. {name} made the process of renting an apartment simple and stress-free. Clear communication throughout.",
      "Really good service at {name}. They answered all our questions and showed us some great properties within our budget.",
      "Nice experience buying our first home with {name}. The team was very patient and guided us through all the paperwork.",
      "The agents at {name} are super helpful. They kept us updated on new listings and were always quick to reply to texts.",
      "A very reliable local agency. {name} is honest about property conditions and the fees are straightforward with no hidden costs.",
      "Great experience. {name} helped us sell our house quickly and they handled all the scheduling for showings very nicely.",
      "Very satisfied with the rental process through {name}. The staff was polite, efficient, and made the paperwork easy.",
      "Highly recommend {name} if you're looking for an apartment. They are friendly, quick, and find exactly what you ask for.",
      "A very professional and friendly team at {name}. They made our home search fun and found us a perfect place."
    ],
    formal: [
      "The real estate advisory services provided by {name} were of the highest professional standard. I commend their market expertise.",
      "I highly recommend {name} for their exemplary professionalism, reliable transaction management, and outstanding client representation.",
      "The brokers and administrative staff at {name} execute their duties with exceptional diligence and professional courtesy.",
      "For sophisticated property acquisition and comprehensive market analysis, {name} is a highly recommended brokerage firm.",
      "Our commercial property transaction was managed by {name} with outstanding professional expertise and precise documentation.",
      "A distinguished real estate firm. {name} demonstrates a superior commitment to ethical standards, transparency, and client satisfaction.",
      "The valuation and marketing services at {name} are executed with great precision. The communication was structured and prompt.",
      "We were thoroughly impressed by the high standards of negotiation and the quiet, professional representation at {name}.",
      "The agents at {name} are highly knowledgeable regarding local zoning and market trends, providing clear and structured guidance.",
      "The contract closing and escrow coordination at {name} were managed with exemplary professional dispatch and absolute clarity."
    ],
    enthusiastic: [
      "WE FOUND OUR DREAM HOME! {name} was absolutely amazing from start to finish! We are so incredibly happy! 🏡💖🌟",
      "OMG! The team at {name} is the best ever! They sold our house in record time and got us way over asking price! 🍾🔥",
      "THE BEST REAL ESTATE EXPERIENCE EVER! {name} made buying a home so fun and stress-free! Highly, highly recommend! 10/10! 😍",
      "I am so grateful for the agents at {name}! They went above and beyond to secure our perfect apartment! Absolute legends! ⭐⭐⭐⭐⭐",
      "Simply spectacular service! {name} has the friendliest team, the best listings, and they treat you like absolute royalty! ❤️🏡",
      "Wow! {name} completely crushed our expectations. Incredible support, fast communication, and they saved us so much money! 💰🌟",
      "If you're buying or selling a home, go to {name} immediately! The team is so talented, high-energy, and sweet! 😍✨",
      "Absolute gold standard for real estate! {name} is professional, highly responsive, and they truly care about their clients! 🌟❤️",
      "I am in love with our new place! {name} listened to exactly what we wanted and delivered a total masterpiece! 🏡❤️",
      "Incredible experience! The brokers at {name} are so knowledgeable and their passion for finding the perfect home is amazing! 🎉🚀"
    ],
    critical: [
      "Poor communication and slow service from {name}. The agents rarely return calls, and they missed several viewing appointments.",
      "The agents at {name} were pushy and did not respect our budget limits. They kept trying to show us overpriced properties.",
      "Unprofessional transaction management. There were several errors in our lease agreement prepared by {name}, which delayed our move.",
      "Disappointing listing information. The properties shown by {name} did not match the descriptions or photos online. Misleading.",
      "Had a terrible experience selling with {name}. The marketing was subpar, and we received zero updates for weeks."
    ]
  },
  education: {
    casual: [
      "Really great experience with {name}. The teachers are very friendly, the environment is welcoming, and my child loves going here.",
      "Nice school with a very supportive community. The admin staff at {name} are easy to talk to and they keep parents well informed.",
      "Really good classes at {name}. The instructors make the lessons fun and interesting, and the classrooms are comfortable.",
      "Great school with plenty of extracurricular activities. The staff at {name} is genuinely caring and helpful.",
      "A solid educational institution. The facilities at {name} are clean, the teachers are patient, and the curriculum is well-rounded.",
      "Very positive experience. {name} has a great focus on student support, and the enrollment process was very simple and clear.",
      "Great local school. {name} has friendly staff, clean classrooms, and they offer a lot of great resources for students.",
      "We are very happy with the tutors at {name}. They explain difficult concepts in a simple, easy-to-understand way.",
      "A very welcoming learning environment. The instructors at {name} are super helpful and patient with all students.",
      "Highly recommend {name} for continuing education. The schedules are flexible, the staff is polite, and the classes are very useful."
    ],
    formal: [
      "The academic instruction and curriculum development at {name} are of the highest professional and pedagogical standard.",
      "I highly recommend {name} for their outstanding faculty, comprehensive research facilities, and dedication to academic excellence.",
      "The administration and educational staff at {name} execute their duties with exceptional efficiency, discipline, and professional courtesy.",
      "For advanced education and structured academic development in a quiet, scholarly environment, {name} is an exemplary institution.",
      "Our professional training program at {name} was managed with outstanding academic rigor and technical precision.",
      "A distinguished educational institution. {name} demonstrates a superior commitment to pedagogical research, safety, and student success.",
      "The student assessment and academic counseling services at {name} are executed with great detail and professional care.",
      "We were thoroughly impressed by the high standards of discipline and the quiet, professional learning environment at {name}.",
      "The faculty at {name} are highly distinguished in their fields, providing clear, structured, and authoritative instruction.",
      "The student registration and academic administration processes at {name} are managed with exemplary professional dispatch and clarity."
    ],
    enthusiastic: [
      "I ABSOLUTELY LOVE THIS SCHOOL! The teachers at {name} are the best on earth and they make learning so incredibly fun! 🎓❤️🌟",
      "OMG! My child has learned so much since joining {name}! The staff is so enthusiastic and the programs are spectacular! 🎉✨",
      "THE BEST LEARNING EXPERIENCE EVER! The classes at {name} are so interactive and the energy in the building is amazing! 10/10!",
      "I am so grateful for the support from the tutors at {name}! They went above and beyond to help me pass my exams! 💯💖",
      "Simply phenomenal academy! {name} has the friendliest team, the coolest activities, and the community is so welcoming! ⭐⭐⭐⭐⭐",
      "Wow! {name} has completely changed my view of education. Outstanding student support, super sweet staff, and beautiful campus! 🏫",
      "If you want to learn something new, join {name} immediately! The instructors are so talented and high-energy! 😍🌟",
      "Absolute gold standard for education! {name} is pristine, high-tech, and has the most energetic and supportive team on earth! 🔥🎓",
      "I am in love with the music and art programs at {name}! So creative and fun! Highly, highly recommend! 🎨❤️",
      "Incredible experience! The workshops at {name} are so engaging and the team's passion for teaching is totally contagious! 🎉🚀"
    ],
    critical: [
      "Disappointing academic quality at {name}. The curriculum is outdated, and the classrooms are overcrowded and poorly equipped.",
      "Lacking student support. The administration at {name} is unorganized, and they are slow to respond to parent and student concerns.",
      "Subpar instruction. The tutors at {name} seemed unprepared for lessons and lacked patience with students. Needs improvement.",
      "Poor school facilities. The computer lab was outdated, the library had limited resources, and the building maintenance was neglected.",
      "Unsatisfactory registration process at {name}. The admin staff was uncoordinated and communication was highly unhelpful."
    ]
  },
  event_planner: {
    casual: [
      "Had a great experience working with {name}. The team was very friendly, organized, and helped us host a wonderful party without any stress.",
      "Very helpful event planner. {name} took care of all the decorations, catering setup, and scheduling, making the day super easy.",
      "Really good service at {name}. They listened to our ideas and set up a beautiful venue that all our guests loved.",
      "Nice experience planning our anniversary with {name}. The coordinator was very patient and guided us through all the choices.",
      "The planners at {name} are super helpful. They kept us updated on details and were always quick to respond to our questions.",
      "A very reliable local event service. {name} is honest about costs, stays within budget, and the setup was completed on time.",
      "Great event setup. {name} helped us organize our corporate gathering quickly, and they handled all the vendor coordination nicely.",
      "Very satisfied with the party planning through {name}. The staff was polite, efficient, and made the coordination process simple.",
      "Highly recommend {name} if you're planning an event. They are friendly, creative, and take care of everything for you.",
      "A very professional and friendly team at {name}. They made our wedding planning fun and stress-free. Great job!"
    ],
    formal: [
      "The event organization and logistics management executed by {name} were of the highest professional standard.",
      "I highly recommend {name} for their exemplary professionalism, reliable vendor coordination, and outstanding event execution.",
      "The event coordinators and design staff at {name} execute their duties with exceptional diligence, precision, and professional courtesy.",
      "For sophisticated corporate gatherings and comprehensive event management in a polished setting, {name} is the premier choice.",
      "Our corporate conference was planned and executed by {name} with outstanding professional expertise and technical accuracy.",
      "A distinguished event planning firm. {name} demonstrates a superior commitment to design excellence, timing, and client satisfaction.",
      "The venue sourcing and logistics coordination at {name} are executed with great precision. The communication was structured and prompt.",
      "We were thoroughly impressed by the high standards of execution and the quiet, professional representation at {name}.",
      "The coordinators at {name} are highly knowledgeable regarding local catering and security protocols, providing clear and structured guidance.",
      "The event production and vendor settlement at {name} were managed with exemplary professional dispatch and absolute clarity."
    ],
    enthusiastic: [
      "THE BEST PARTY EVER! {name} did an absolutely amazing job from start to finish! Our guests were completely blown away! 🥳🎉🌟",
      "OMG! The decorations by {name} were pure magic! The team is so creative and they made our wedding look like a fairytale! 🍾🔥",
      "THE BEST EVENT PLANNING EXPERIENCE EVER! {name} made our launch party so fun and completely stress-free! 10/10! 😍",
      "I am so grateful for the team at {name}! They went above and beyond to make sure our baby shower was absolutely perfect! ⭐⭐⭐⭐⭐",
      "Simply spectacular service! {name} has the friendliest planners, the most creative designs, and they treat you like royalty! ❤️🎉",
      "Wow! {name} completely crushed our expectations. Incredible organization, fast communication, and the event was flawless! 🌟💖",
      "If you're hosting an event, hire {name} immediately! The team is so talented, high-energy, and sweet! 😍✨",
      "Absolute gold standard for event planning! {name} is professional, highly responsive, and they truly care about their clients! 🌟❤️",
      "I am in love with the venue design! {name} took our simple ideas and turned them into a total masterpiece! 🎉🏡",
      "Incredible experience! The planners at {name} are so detailed and their passion for creating beautiful events is amazing! 🎉🚀"
    ],
    critical: [
      "Disorganized event coordination by {name}. The catering was delayed, the layout did not match our plans, and the staff was uncoordinated.",
      "Poor communication and hidden charges. {name} exceeded our budget significantly and failed to inform us of extra vendor fees.",
      "Subpar setup. The decorations by {name} looked cheap and unfinished, and the sound system had technical issues during the event.",
      "Very disappointed with the wedding planning through {name}. The coordinator was hard to reach and key details were forgotten.",
      "Unprofessional event execution. The team at {name} was unhelpful and seemed overwhelmed by the size of the gathering."
    ]
  },
  ecommerce: {
    casual: [
      "Great experience buying from {name}. The website is easy to use, the shipping was fast, and the product arrived in perfect condition.",
      "Very decent online store. The checkout at {name} was smooth, and they sent tracking info right away. Good quality items.",
      "Really good service at {name}. I had to exchange an item, and their customer support resolved it quickly and without any hassle.",
      "Nice shopping experience. The items at {name} match the description exactly, and the packaging was very secure.",
      "The support team at {name} is super helpful. They answered my product questions quickly and helped me choose the right size.",
      "A very reliable e-commerce site. {name} has fair pricing, high-quality products, and the delivery was ahead of schedule.",
      "Great selection of unique items. {name} has a clean website layout, checkout was quick, and the items are exactly as pictured.",
      "Very satisfied with my purchase from {name}. The shipping was fast, the prices are competitive, and the product works great.",
      "Highly recommend {name} for online shopping. They have a great return policy, fast delivery, and very friendly customer service.",
      "A very friendly and reliable seller. {name} made the online shopping process simple and straightforward. Will buy again."
    ],
    formal: [
      "The transaction processing and digital commerce services provided by {name} are of the highest professional standard.",
      "I highly recommend {name} for their exemplary logistical coordination, secure payment gateways, and prompt delivery of goods.",
      "The order fulfillment and customer support operations at {name} are executed with exceptional efficiency and professional courtesy.",
      "For high-quality products, secure transaction management, and reliable shipping, {name} is a highly recommended e-commerce merchant.",
      "Our procurement order was managed by {name} with outstanding accuracy, professional dispatch, and clear invoicing.",
      "A distinguished digital retailer. {name} demonstrates a superior commitment to product standards, packaging integrity, and customer satisfaction.",
      "The shipping tracking and return coordination at {name} are executed with great precision. The communication was structured and prompt.",
      "We were thoroughly impressed by the high standards of packaging and the quiet, professional customer service at {name}.",
      "The technical specifications provided on the {name} platform are highly accurate, assisting in making informed procurement decisions.",
      "The bulk shipping and customs documentation at {name} were managed with exemplary professional dispatch and absolute clarity."
    ],
    enthusiastic: [
      "FASTEST SHIPPING EVER! The product from {name} is absolutely amazing and the packaging was so beautiful! 100% recommended! 📦✨💖",
      "OMG! I am in love with my purchase from {name}! The quality is outstanding and they even included a sweet thank you note! 🌟😍",
      "THE BEST ONLINE SHOPPING EXPERIENCE EVER! The website at {name} is so fast and the products are top-tier! 10/10! 🛍️🎉",
      "I am officially obsessed with this store! {name} has the coolest items, great discounts, and the customer support is spectacular! ⭐⭐⭐⭐⭐",
      "Simply phenomenal! The products at {name} are exactly as described and the delivery was lightning fast! Love it! ❤️📦",
      "Absolute perfection! The customer service at {name} is so helpful and the shopping process is incredibly easy! 🌟💖",
      "If you want high-quality items online, buy from {name} immediately! The team is incredibly responsive and sweet! 😍✨",
      "Wow! My order arrived in just two days. {name} is a total gem of an online retailer. Highly, highly recommended! 💎🔥",
      "I am in love with this brand! {name} has the coolest products, great social media support, and the friendliest staff! 🛍️🎉",
      "An absolute masterpiece of a shopping experience! The checkout at {name} was so simple and the delivery was perfect! 🌟🚀"
    ],
    critical: [
      "The item I ordered from {name} arrived damaged due to poor packaging. Customer support took five days to reply and refused a free return.",
      "Extremely slow shipping. It took three weeks for my order from {name} to arrive, and the tracking information was never updated.",
      "Subpar product quality. The item was made of cheap plastic and did not match the product description on the website at all.",
      "Terrible return process. {name} charging restock fees and return shipping fees is highly unfair for defective items.",
      "Unreliable digital store. My order was canceled without explanation, and getting my refund took over a week of emails."
    ]
  },
  marketing: {
    casual: [
      "Had a great experience working with {name}. They are very friendly, creative, and helped us increase our social media reach nicely.",
      "Very helpful marketing agency. {name} made the process of launching our ad campaign simple and stress-free. Clear communication throughout.",
      "Really good service at {name}. They answered all our questions and set up a great marketing strategy within our budget.",
      "Nice experience working on our brand identity with {name}. The coordinator was very patient and guided us through all the choices.",
      "The team at {name} is super helpful. They kept us updated on campaign metrics and were always quick to reply to our questions.",
      "A very reliable local marketing service. {name} is honest about costs, stays within budget, and the reports are straightforward.",
      "Great campaign setup. {name} helped us organize our promotion quickly, and they handled all the creative assets nicely.",
      "Very satisfied with the advertising through {name}. The staff was polite, efficient, and made the coordination process simple.",
      "Highly recommend {name} if you're looking to grow your business. They are friendly, creative, and take care of everything for you.",
      "A very professional and friendly team at {name}. They made our marketing strategy fun and stress-free. Great job!"
    ],
    formal: [
      "The marketing consultation and campaign execution delivered by {name} were of the highest professional standard.",
      "I highly recommend {name} for their exemplary professionalism, reliable data analysis, and outstanding campaign performance.",
      "The account managers and creative staff at {name} execute their duties with exceptional diligence, precision, and professional courtesy.",
      "For sophisticated brand strategy and comprehensive market analysis in a polished corporate setting, {name} is the premier choice.",
      "Our digital advertising strategy was planned and executed by {name} with outstanding professional expertise and technical accuracy.",
      "A distinguished marketing firm. {name} demonstrates a superior commitment to performance metrics, transparency, and client satisfaction.",
      "The search engine optimization and media buying services at {name} are executed with great precision. The reports were structured and prompt.",
      "We were thoroughly impressed by the high standards of reporting and the quiet, professional representation at {name}.",
      "The strategists at {name} are highly knowledgeable regarding audience segmentation and demographic trends, providing clear and structured guidance.",
      "The client onboarding and campaign launch at {name} were managed with exemplary professional dispatch and absolute clarity."
    ],
    enthusiastic: [
      "OUR SALES EXPLODED! Working with {name} was the best decision we ever made! They are absolute geniuses! 📈🔥🚀",
      "OMG! The creative designs by {name} were pure magic! Our engagement is higher than it's ever been! 🌟😍",
      "THE BEST MARKETING EXPERIENCE EVER! {name} made our launch campaign so fun and completely stress-free! 10/10! 🎉",
      "I am so grateful for the team at {name}! They went above and beyond to make sure our brand launch was absolutely perfect! ⭐⭐⭐⭐⭐",
      "Simply spectacular service! {name} has the friendliest team, the most creative ideas, and they treat you like royalty! ❤️📈",
      "Wow! {name} completely crushed our expectations. Incredible results, fast communication, and the campaign was flawless! 🌟💖",
      "If you want to grow your business, hire {name} immediately! The team is so talented, high-energy, and sweet! 😍✨",
      "Absolute gold standard for digital marketing! {name} is professional, highly responsive, and they truly care about their clients! 🌟❤️",
      "I am in love with our new website and ads! {name} took our simple ideas and turned them into a total masterpiece! 🎨💻",
      "Incredible experience! The marketers at {name} are so detailed and their passion for creating beautiful campaigns is amazing! 🎉🚀"
    ],
    critical: [
      "Subpar performance and lack of communication from {name}. Our ad spend was wasted with zero conversion results and no report explanation.",
      "The creative assets delivered by {name} were of poor quality and did not match our brand guidelines at all. Very disappointed.",
      "Unreliable campaign management. The launch dates were missed repeatedly by {name}, leading to lost sales during our key season.",
      "Overpriced marketing services. We paid a premium fee, but the execution felt rushed and the communication was unorganized.",
      "Unsatisfactory consultation. The team at {name} was unprepared and proposed a generic strategy with no market research."
    ]
  },
  corporate: {
    casual: [
      "Had a very positive experience with {name}. The office was clean, the reception staff was welcoming, and they resolved our inquiry quickly.",
      "Nice corporate office with a very friendly environment. The staff at {name} are easy to talk to and the service is reliable.",
      "Really good service at {name}. The administration is efficient, and they handle client meetings in a very comfortable way.",
      "Nice experience visiting {name}. The reception team was very polite and directed us to our meeting room without any wait.",
      "The office staff at {name} is super helpful. They answered all our questions and made sure we had everything we needed during our visit.",
      "A very reliable company. The team at {name} is honest, professional, and their customer support is straightforward.",
      "Great office setup. {name} has comfortable meeting spaces, friendly staff, and the administration process is very clean.",
      "Very satisfied with the communication through {name}. The staff was polite, efficient, and made the coordination process simple.",
      "Highly recommend {name} for their great client support, friendly environment, and reliable corporate services.",
      "A very professional and friendly team at {name}. They made our business meeting simple and straightforward. Great job!"
    ],
    formal: [
      "The corporate operations and administrative services executed by {name} are of the highest professional standard.",
      "I highly recommend {name} for their exemplary corporate governance, reliable communications, and outstanding client management.",
      "The directors and corporate staff at {name} execute their duties with exceptional diligence, precision, and professional courtesy.",
      "For sophisticated corporate consultations and comprehensive enterprise solutions in a polished setting, {name} is the premier choice.",
      "Our corporate transaction was managed by {name} with outstanding professional expertise, speed, and technical accuracy.",
      "A distinguished corporate institution. {name} demonstrates a superior commitment to compliance, transparency, and stakeholder satisfaction.",
      "The administrative support and client relations at {name} are executed with great precision. The reporting was structured and prompt.",
      "We were thoroughly impressed by the high standards of corporate presentation and the quiet, professional representation at {name}.",
      "The advisors at {name} are highly knowledgeable regarding regulatory compliance and strategic planning, providing clear and structured guidance.",
      "The corporate onboarding and partner coordination at {name} were managed with exemplary professional dispatch and absolute clarity."
    ],
    enthusiastic: [
      "ABSOLUTELY PHENOMENAL TEAM! {name} has the best corporate culture and the customer support is outstanding! 🌟🔥🚀",
      "OMG! The service from {name} was pure perfection! The team is so efficient and they resolved our issues in minutes! 🍾😍",
      "THE BEST CORPORATE EXPERIENCE EVER! {name} made our partnership launch so smooth and completely stress-free! 10/10!",
      "I am so grateful for the team at {name}! They went above and beyond to make sure our corporate transition was absolutely perfect! ⭐⭐⭐⭐⭐",
      "Simply spectacular support! {name} has the friendliest team, the most professional office, and they treat you like royalty! ❤️💼",
      "Wow! {name} completely crushed our expectations. Incredible organization, fast communication, and the service was flawless! 🌟💖",
      "If you need corporate services, partner with {name} immediately! The team is so talented, high-energy, and sweet! 😍✨",
      "Absolute gold standard for corporate relations! {name} is professional, highly responsive, and they truly care about their partners! 🌟❤️",
      "I am in love with the new meeting setup! {name} took our requirements and turned them into a total masterpiece! 💼💻",
      "Incredible experience! The support team at {name} is so detailed and their passion for client success is amazing! 🎉🚀"
    ],
    critical: [
      "Unorganized corporate operations at {name}. Client onboarding took weeks due to internal paperwork delays and poor coordination.",
      "Lacking professional communication. The administration at {name} is highly unresponsive, ignoring direct emails for days.",
      "Subpar client services. The team at {name} was unprepared for our project review and presented a generic report.",
      "Overpriced enterprise solutions. We paid a premium rate, but the execution was slow and uncoordinated.",
      "Unsatisfactory consulting experience. The advisors at {name} had minimal knowledge of our industry regulations."
    ]
  },
  freelance: {
    casual: [
      "Had a great experience working with {name}. They are super friendly, easy to talk to, and delivered the project exactly on time.",
      "Highly recommend {name} for their creative work, reasonable rates, and reliable communication. Very pleasant to deal with.",
      "Very professional and easy to deal with. {name} did a fantastic job, communicated clearly, and I will certainly work with them again.",
      "Great experience from start to finish. {name} was very helpful, listened to all our feedback, and made the changes quickly.",
      "A very reliable and friendly freelancer. {name} took care of everything quickly and made the design process simple and fun.",
      "Really glad I chose {name} for this project. They were prompt, polite, and the pricing was very clear with no hidden fees.",
      "Excellent customer service and solid work. {name} is dependable, friendly, and very easy to communicate with. Will hire again.",
      "Very happy with the results from {name}. They were on time, did a very clean job, and were extremely polite throughout.",
      "Had a great experience collaborating with {name} today. The project was completed on time and the output was outstanding.",
      "A solid creative professional. {name} has a great attitude and their services are offered at very reasonable rates."
    ],
    formal: [
      "The services rendered by {name} were of the highest professional standard. I commend their technical expertise and clear communication.",
      "I would highly recommend {name} for their exemplary professionalism, reliable project management, and prompt delivery of work.",
      "The consulting and design work executed by {name} demonstrated outstanding expertise and professional conduct. A highly reliable partner.",
      "For efficient, professional, and high-quality independent consulting, {name} is highly recommended. Their attention to detail is exemplary.",
      "An exceptionally professional independent business owner. {name} delivers excellent results with clear documentation and support.",
      "We were thoroughly impressed by the high standards of execution and professional communication maintained by {name}.",
      "{name} consistently provides reliable, high-caliber independent services. Their work is structured, prompt, and dedicated to excellence.",
      "I am pleased to write this recommendation for {name}. Their freelance work is characterized by thoroughness, professionalism, and integrity.",
      "An outstanding professional for technical consulting and creative execution. {name} exhibits great diligence and integrity.",
      "The execution of the project contract by {name} was exceptional. The deliverables were completed within budget and to high specifications."
    ],
    enthusiastic: [
      "ABSOLUTELY INCREDIBLE! {name} completely blew me away with their creative talent and fast delivery! 10/10 recommend! 🌟🔥🎨",
      "Unbelievably great experience! The work from {name} is top-tier and their attention to detail is outstanding! 100% recommended! 😍🙌",
      "Wow, just wow! {name} completely crushed our project! Incredibly friendly, fast, and creative! Absolutely amazing! ❤️🎉",
      "I cannot recommend {name} enough! They are extremely friendly, super fast, and do high-quality work with a smile! Best ever! ⭐💖",
      "Outstanding collaboration! {name} is absolute perfection. They are professional, friendly, and deliver results that exceed expectations! 🌟",
      "If you need creative work, hire {name} immediately! They are absolute legends and did a spectacular job for us! 😍🎉",
      "Amazing talent and spectacular results! {name} made the whole process super easy, stress-free, and fun! Love their energy! 💖⭐",
      "Absolutely brilliant! {name} did an amazing job and their communication is the friendliest I've ever encountered! 10/10! 🔥🌟",
      "THE BEST FREELANCE EXPERIENCE OF MY LIFE! I am absolutely in love with the design from {name}! Highly recommended! 😍✨",
      "Oh my god, the quality of work is to die for! {name} has the absolute best style and the coolest ideas! 🎨🔥"
    ],
    critical: [
      "Extremely disappointed with {name}. The project was delivered two weeks late, and communication during the wait was nonexistent.",
      "Poor quality of deliverables. The work from {name} did not follow the guidelines provided and required multiple revisions.",
      "Unprofessional contract work. {name} stopped responding mid-project and missed several critical deadlines. Cannot recommend.",
      "Overpriced for basic work. The final output from {name} was very simplistic and did not justify the premium rate charged.",
      "Unsatisfactory technical skills. The deliverables had many errors that we had to fix ourselves. Very frustrating."
    ]
  },
  other: {
    casual: [
      "Had a wonderful experience with {name}. The team was very friendly, helpful, and got the job done nicely and on time. Highly recommend.",
      "Highly recommend {name} for their great customer service, straightforward pricing, and reliable work. Very pleasant to deal with.",
      "Very professional and easy to deal with. {name} did a fantastic job, communicated clearly, and I will certainly use their services again.",
      "Great experience from start to finish. {name} has a helpful team, fair pricing, and they made sure everything was completed to my satisfaction.",
      "A very reliable and friendly business. {name} took care of everything quickly and efficiently. Appreciate the great service!",
      "Really glad I chose {name}. The service was prompt, the staff was polite, and the pricing was clear with no hidden fees.",
      "Excellent customer service and solid work. {name} is dependable, friendly, and very easy to communicate with. Will use again.",
      "Very happy with the service provided by {name}. They were on time, did a clean job, and the staff was extremely courteous.",
      "Had a great experience working with {name} today. The project was completed on time and the team was extremely friendly.",
      "A solid local business. {name} has a great team and their services are offered at very reasonable rates."
    ],
    formal: [
      "The service rendered by {name} was of the highest professional standard. I commend their dedication, efficiency, and clear communication.",
      "I would highly recommend {name} for their exemplary professionalism, reliable communication, and prompt delivery of services.",
      "The team at {name} demonstrated outstanding expertise and professional conduct throughout our engagement. A highly reliable partner.",
      "For efficient, professional, and high-quality service, {name} is highly recommended. Their attention to client needs is exemplary.",
      "An exceptionally professional business. {name} delivers excellent results with clear documentation and polite customer support.",
      "We were thoroughly impressed by the high standards of execution and professional communication maintained by {name}.",
      "{name} consistently provides reliable, high-caliber services. Their staff is knowledgeable, polite, and dedicated to excellence.",
      "I am pleased to write this recommendation for {name}. Their work is characterized by thoroughness, professionalism, and integrity.",
      "An outstanding organization for consulting and technical support. The technicians at {name} exhibit great professional diligence.",
      "The execution of the contract services by {name} was exceptional. The project was completed within budget and to high specifications."
    ],
    enthusiastic: [
      "Absolutely FANTASTIC service from {name}! They went above and beyond in every way possible! Will definitely use them again! 10/10! 🌟🔥",
      "Unbelievably great experience! The team at {name} is top-tier and their quality of work is outstanding! 100% recommended to everyone! 😍🙌",
      "Wow, just wow! {name} completely blew me away with their incredible customer service and quick work! Absolutely amazing! ❤️🎉",
      "I cannot recommend {name} enough! They are extremely friendly, super fast, and do high-quality work with a smile! Best service ever! ⭐💖",
      "Outstanding experience! {name} is absolute perfection. They are professional, friendly, and deliver results that exceed expectations! 🌟",
      "If you need this service, do not hesitate to contact {name}! They are absolute legends and did a spectacular job for us! 😍🎉",
      "Amazing team and spectacular results! {name} made the whole process super easy, stress-free, and fun! Love their energy! 💖⭐",
      "Absolutely brilliant! {name} did an amazing job and their customer support is the friendliest I've ever encountered! 10/10! 🔥🌟",
      "THE BEST CUSTOMER EXPERIENCE OF MY LIFE! I am absolutely in love with {name}! The staff is so sweet and the results are beautiful! 😍✨",
      "Oh my god, the quality here is to die for! {name} has the absolute best team and the coolest support channels! 🛠️🔥"
    ],
    critical: [
      "Disappointing service from {name}. The team arrived late, did not complete the tasks as agreed, and the pricing was higher than quoted.",
      "Unreliable communication and subpar results. {name} made several mistakes and refused to fix them without extra charges.",
      "Not professional. The staff at {name} was dismissive of our requests and did a rushed job. Cannot recommend.",
      "Overpriced for simple tasks. We paid a premium fee, but the execution was lacking and client support was unorganized.",
      "Unsatisfactory experience. The team at {name} was uncoordinated, causing multiple delays and errors throughout the project."
    ]
  }
};

module.exports = REVIEW_TEMPLATES;
