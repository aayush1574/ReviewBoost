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
      "Had a really nice lunch at {name}. The outdoor seating was lovely, the sandwiches were packed with flavor, and the drinks were refreshing. Perfect midday stop."
    ],
    formal: [
      "Dining at {name} was an exemplary culinary experience. Each course was prepared with evident skill and presented with artistic precision. The staff is highly knowledgeable and attentive.",
      "I am pleased to recommend {name} as a dining destination of the highest order. The menu demonstrates a masterful understanding of flavor profiles and premium ingredients.",
      "{name} consistently delivers an exceptional dining experience. The quality of ingredients is superb, the wine list is carefully curated, and the execution is flawless from start to finish.",
      "The service at {name} was impeccable and the ambiance refined. An outstanding choice for business dinners, special celebrations, or anyone appreciating fine gastronomy.",
      "From the elegant table settings to the sophisticated flavor combinations, {name} represents the pinnacle of fine dining in the area. A truly remarkable evening.",
      "We were thoroughly impressed by the culinary craftsmanship at {name}. The attention to detail in both service and presentation created an unforgettable dining experience.",
      "The sophisticated atmosphere at {name} is matched only by the excellence of its kitchen. Every dish was executed to perfection, showing great culinary discipline.",
      "For those seeking a refined and sophisticated meal, {name} is the premier choice. The service is unobtrusive yet highly attentive, and the cuisine is top-tier."
    ],
    enthusiastic: [
      "The food at {name} is absolutely DIVINE!! Every single dish was bursting with flavor and the presentation was GORGEOUS! 11/10 would eat here every single day! ⭐⭐⭐⭐⭐",
      "OH MY GOODNESS!! {name} is hands down the BEST restaurant I've ever been to!! The creative menu, energetic vibes, and amazing hospitality blew me away!",
      "BEST. DINING. EXPERIENCE. EVER!! {name} absolutely knocked it out of the park! The flavors are mind-blowing, and the staff treated us like royalty!",
      "I literally cannot stop raving about {name}! The taste, the service, the music, the mocktails - absolutely everything was flawless! Do yourself a favor and visit ASAP! 🎉🔥",
      "Wow, just wow! {name} completely exceeded my expectations! The atmosphere is electric, the food is mouth-watering, and the desserts are out of this world! ❤️",
      "Absolute perfection! {name} has officially won my heart. The dishes are so unique and flavorful, and the staff's passion for great food really shows!",
      "If you haven't been to {name} yet, you are seriously missing out! The food is legendary, the portion sizes are huge, and the service is incredibly fast and friendly! 🌟",
      "An absolute flavor explosion! {name} is a masterpiece of a restaurant. Every bite was pure bliss, and the cocktails were masterfully crafted!"
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
      "A great option for business travelers or tourists alike. {name} offers clean, quiet rooms, friendly service, and a convenient location close to key spots."
    ],
    formal: [
      "I had the privilege of staying at {name} recently, and the experience was truly exemplary. The accommodations were impeccably maintained, and the service was professional.",
      "{name} represents the gold standard in hospitality. From the seamless arrival experience to the meticulously appointed rooms, every detail is handled with care.",
      "My stay at {name} was characterized by outstanding service, sophisticated amenities, and a quiet, professional environment ideal for business travel.",
      "With its elegant architecture, high-end amenities, and exceptionally trained concierge staff, {name} delivers a premium lodging experience of the highest tier.",
      "The level of professionalism and attentiveness displayed by the staff at {name} was superb. The rooms are spacious, well-appointed, and offer complete comfort.",
      "A magnificent establishment. {name} offers refined luxury, peaceful surroundings, and a commitment to guest satisfaction that is visible in every department.",
      "For a sophisticated and relaxing stay, {name} is unmatched. The executive lounge, fitness center, and in-room technology are all of superior quality.",
      "We were thoroughly impressed by the exemplary standards of service at {name}. The staff went above and beyond to ensure our conference stay was perfect."
    ],
    enthusiastic: [
      "OMG {name} is AMAZING!! The rooms are absolutely gorgeous, the staff are the absolute sweetest, and I literally did not want to check out! 100% recommended! 🏨✨",
      "I am completely OBSESSED with {name}!!! Everything from the stunning lobby to the room views was pure perfection. Hands down the best hotel stay of my life!",
      "Absolute paradise! {name} exceeded all my expectations! The pool is beautiful, the room service is fast, and the staff makes you feel so special! 🌟💖",
      "What an incredible experience! {name} is beautiful, clean, and has the most fun atmosphere. The breakfast was legendary and the service was top-notch! 😍",
      "I can't say enough good things about {name}! The design is gorgeous, the beds are super cozy, and the location is unbeatable! Will definitely be back!",
      "Best vacation ever thanks to {name}! The amenities are top-tier, the rooms are pristine, and the views are absolutely breathtaking! 10/10!",
      "If you're looking for the ultimate staycation, {name} is the place to be! The service is outstanding, the vibes are perfect, and the spa is heaven! 🌸⭐",
      "Phenomenal hotel! {name} is a total gem. The staff was incredibly welcoming, the rooms were super modern, and the rooftop view was unforgettable!"
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
      "The perfect spot for a weekend morning. {name} offers delicious pastries, great specialty coffees, and a relaxed environment to start your day."
    ],
    formal: [
      "{name} offers a refined coffee experience. The selection of single-origin beans and the precise brewing methods demonstrate a commitment to coffee craft.",
      "The sophisticated atmosphere at {name} makes it an ideal venue for morning business meetings or quiet, focused work. The service is highly professional.",
      "An exceptional establishment for coffee connoisseurs. {name} provides meticulously prepared beverages and high-quality artisanal pastries in an elegant setting.",
      "The attention to detail in the brewing process at {name} is highly commendable. The seating is comfortable and the environment is quiet and professional.",
      "A distinguished cafe with an upscale environment. {name} consistently delivers excellent service, premium teas, and sophisticated light bites.",
      "For those who appreciate the finer details of espresso extraction, {name} is the premier choice. The staff is polite, and the setting is impeccably clean.",
      "{name} stands out for its high-quality coffee selection and refined ambiance. Ideal for professionals looking for a premium café experience.",
      "The service at {name} is prompt and polite, and the product quality is excellent. A highly recommended spot for business discussions over coffee."
    ],
    enthusiastic: [
      "BEST COFFEE EVER! {name} has the absolute friendliest staff and the vibes are unmatched! My absolute favorite spot in the city! ☕🔥",
      "I am completely in love with {name}! The matcha latte is to die for, the pastries are heavenly, and the aesthetic is absolutely beautiful! 10/10! 😍✨",
      "Oh my goodness, the waffles at {name} are out of this world! The coffee is super smooth and the baristas are always smiling! Highly recommend! ❤️🥞",
      "My new favorite obsession! {name} has the coolest interior design, incredible coffee, and the most delicious sweet treats! Absolutely love it!",
      "If you're a coffee lover, you NEED to visit {name}! The espresso is top-tier, the music is great, and the atmosphere is so uplifting! ⭐",
      "Absolute perfection in a cup! {name} knows exactly how to make a perfect flat white. The staff is super passionate and the energy here is amazing! 🌟",
      "Everything about {name} is top-notch! The staff, the drinks, the aesthetic - it's a dream come true for anyone who loves cafes! 💖",
      "I could spend all day at {name}! The pastries are baked to perfection and the iced drinks are refreshing and delicious! ☕🎉"
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
      "A great neighborhood store. {name} has high-quality produce, a good cheese selection, and the employees are always polite and efficient."
    ],
    formal: [
      "{name} consistently maintains high standards of sanitation, stock availability, and professional customer service. A highly reliable retail location.",
      "An exceptionally well-organized establishment. {name} offers a premium selection of organic, local, and specialty products for the discerning shopper.",
      "The inventory management and cleanliness at {name} are exemplary. The checkout process is efficient, and the staff exhibits professional courtesy.",
      "For high-quality fresh ingredients and a quiet, organized shopping environment, {name} is highly recommended. The meat and seafood selection is outstanding.",
      "{name} provides a superior grocery shopping experience. The aisles are spacious, the product labeling is clear, and the staff is highly attentive to customer needs.",
      "A professionally managed grocery store with an impressive range of international and organic items. {name} maintains excellent standards throughout.",
      "The quality control at {name} is highly impressive. The produce section is meticulously curated, and the staff is always polite and professional.",
      "We appreciate the high standards of cleanliness and the professional service at {name}. It is our preferred destination for premium ingredients."
    ],
    enthusiastic: [
      "My absolute FAVORITE grocery store! {name} has the freshest organic produce and the customer service is unmatched! Love shopping here! 😍🛒",
      "I love shopping at {name}! They have so many hard-to-find international items, amazing fresh bread, and the staff are incredibly sweet and helpful! 🥖✨",
      "The best grocery store ever! The bakery at {name} is to die for, everything is super clean, and the checkout is incredibly fast! Highly recommend! 🌟❤️",
      "I am obsessed with the ready-to-eat section at {name}! So many delicious options, and the produce is always peak quality! Absolutely wonderful! 🎉",
      "Outstanding selection! {name} has completely transformed my weekly grocery runs. The staff is always so cheerful and the quality is amazing!",
      "A grocery shopper's dream! {name} is incredibly organized, has fantastic deals, and the produce section looks like a work of art! 10/10! 🍉💖",
      "I can't say enough good things about {name}! The staff goes out of their way to help, the selection is huge, and everything is super fresh! ⭐",
      "Absolutely top-tier! {name} is clean, well-stocked, and has a fantastic selection of specialty health foods. My go-to store forever! 🛒🔥"
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
      "Really pleasant store. {name} offers nice options for both work and casual wear. The staff was polite and the checkout process was smooth."
    ],
    formal: [
      "{name} offers an elegant shopping environment with highly attentive staff, well-crafted fashion items, and exceptional customer service.",
      "A distinguished boutique. The fabrics and designs at {name} are of superior caliber, suitable for formal, professional, and luxury wardrobes.",
      "The customer service at {name} is exemplary. The consultants are highly knowledgeable about fit and styling, making for a refined experience.",
      "For high-quality materials and classic silhouettes, {name} is highly recommended. The store layout is sophisticated and the service is professional.",
      "{name} maintains an impressive inventory of elegant apparel. The quality of craftsmanship is evident in every garment, and the staff is polite.",
      "A premium clothing store with a focus on quality and fit. The staff at {name} provides tailored assistance in a quiet, sophisticated setting.",
      "The shopping experience at {name} is defined by professional service and premium quality garments. An excellent destination for formal attire.",
      "We were highly impressed by the curation of the wardrobe collections at {name}. The service was refined and the fitting rooms were comfortable."
    ],
    enthusiastic: [
      "OH MY GOSH! I wanted to buy the whole store! {name} has the most fashionable clothes and the staff is so helpful and sweet! 👗✨",
      "Best clothing shopping experience ever! {name} has unique styles you won't find anywhere else! Absolutely obsessed with my new outfits! 💖🛍️",
      "I am in LOVE with this boutique! {name} has the absolute cutest clothes, the material is super high-quality, and the vibe is amazing! ⭐🌟",
      "Wow, what an incredible selection! {name} has officially become my favorite place to shop. The staff is so fun and helpful! 10/10! 🎉💃",
      "Absolutely gorgeous designs! {name} has the most stunning dresses and accessories. The customer service is top-tier and the shopping vibe is so fun!",
      "If you need a wardrobe makeover, you must visit {name}! The styles are fresh and trendy, and the staff will help you style the perfect look! ❤️",
      "So many compliments on the outfit I bought from {name}! The store is beautiful, the selection is curated perfectly, and I had the best time! 🌟",
      "A fashion lover's paradise! {name} is packed with beautiful, high-quality pieces. The shopping experience is always an absolute joy! 🛍️🔥"
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
      "Very satisfied with my visit to {name}. The service was prompt, the staff was attentive, and the results were exactly what I hoped for."
    ],
    formal: [
      "The service at {name} is highly professional and meticulously executed. I am extremely satisfied with the level of care and attention to detail.",
      "An upscale salon experience of the highest order. {name} provides outstanding treatments in an atmosphere of quiet, refined sophistication.",
      "The stylists at {name} demonstrate superior technique and professional expertise. The environment is spotless, and the service is exemplary.",
      "For premium hair and beauty treatments, {name} is highly recommended. The staff is polite, professional, and highly skilled in their craft.",
      "A truly professional establishment. {name} offers high-end services using premium products in a quiet and relaxing atmosphere.",
      "My appointment at {name} was handled with the utmost professionalism. The consultation was thorough and the execution was flawless.",
      "The standards of hygiene and customer service at {name} are impeccable. An excellent choice for anyone seeking high-quality salon services.",
      "We highly appreciate the professional standards and polite staff at {name}. The services provided are consistently of the highest quality."
    ],
    enthusiastic: [
      "I feel like a brand new person! The team at {name} is incredibly talented, super sweet, and absolutely nailed my look! LOVE IT! 💇‍♀️💖",
      "OMG! {name} is the absolute best salon in town! I've never been happier with my hair. They are absolute magicians! 🌟✨",
      "The absolute BEST pampering session ever! {name} is gorgeous, the staff is so friendly, and my hair looks absolutely stunning! 10/10! 😍❤️",
      "I am obsessed with my new look! The stylists at {name} are true artists and the whole experience was super relaxing and fun! 🌸🎉",
      "An absolute dream of a salon! {name} has the best vibes, the staff makes you feel like a star, and the quality of work is outstanding! ⭐",
      "If you want to look and feel amazing, you need to book an appointment at {name} immediately! Absolutely phenomenal service! 💇‍♀️🔥",
      "Best salon experience of my life! {name} has the most talented stylists, the service is top-notch, and the salon itself is beautiful! 💖🌟",
      "Unbelievable results! {name} exceeded all my expectations. The staff is incredibly knowledgeable and they make the experience so special! 😍"
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
      "A very reliable store for all your daily needs. {name} has friendly employees, a clean layout, and checkout is usually quick."
    ],
    formal: [
      "{name} provides a curated shopping experience with exceptional customer service and premium quality goods. Highly recommended.",
      "The inventory at {name} is excellently organized, and the staff demonstrates high product knowledge and professional courtesy.",
      "An outstanding retail establishment. {name} maintains high standards of cleanliness, merchandise display, and customer relations.",
      "For a quiet, organized, and high-quality shopping experience, {name} is the premier choice. The service is efficient and professional.",
      "The management and staff at {name} are to be commended for their professional service and commitment to customer satisfaction.",
      "A sophisticated retail store offering premium products. The staff at {name} is attentive and polite, providing excellent service.",
      "We were thoroughly impressed by the organization and quality of products at {name}. A highly professional and reliable business.",
      "The customer service at {name} is exemplary. The environment is professional, and the product selection is of superior caliber."
    ],
    enthusiastic: [
      "MY FAVORITE STORE! {name} has the absolute coolest items and the staff are always so helpful and fun! Highly, highly recommend! ⭐⭐⭐⭐⭐",
      "I could spend hours browsing at {name}! Incredible customer service, a fantastic product range, and such a fun shopping atmosphere! 🎉🛍️",
      "Wow! {name} is absolutely amazing! They have unique products you won't find anywhere else and the staff is incredibly sweet! 😍✨",
      "Best shopping experience ever! The team at {name} is so welcoming, the prices are great, and the selection is mind-blowing! ❤️🌟",
      "I am obsessed with {name}! The store has the best vibes, the staff is super helpful, and they always have new and exciting items! 💖",
      "Absolute gem of a store! {name} has won me over with their amazing customer service and high-quality products. Love it! 🛍️🔥",
      "If you haven't shopped at {name} yet, you are missing out on a shopping adventure! The staff is awesome and the store is beautiful! ⭐",
      "Everything about {name} is perfect! The layout, the staff, the products - I always leave with a smile and great purchases! 🎉😍"
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
      "Very happy with the service provided by {name}. They were on time, did a clean job, and the staff was extremely courteous."
    ],
    formal: [
      "The service rendered by {name} was of the highest professional standard. I commend their dedication, efficiency, and clear communication.",
      "I would highly recommend {name} for their exemplary professionalism, reliable communication, and prompt delivery of services.",
      "The team at {name} demonstrated outstanding expertise and professional conduct throughout our engagement. A highly reliable partner.",
      "For efficient, professional, and high-quality service, {name} is highly recommended. Their attention to client needs is exemplary.",
      "An exceptionally professional business. {name} delivers excellent results with clear documentation and polite customer support.",
      "We were thoroughly impressed by the high standards of execution and professional communication maintained by {name}.",
      "{name} consistently provides reliable, high-caliber services. Their staff is knowledgeable, polite, and dedicated to excellence.",
      "I am pleased to write this recommendation for {name}. Their work is characterized by thoroughness, professionalism, and integrity."
    ],
    enthusiastic: [
      "Absolutely FANTASTIC service from {name}! They went above and beyond in every way possible! Will definitely use them again! 10/10! 🌟🔥",
      "Unbelievably great experience! The team at {name} is top-tier and their quality of work is outstanding! 100% recommended to everyone! 😍🙌",
      "Wow, just wow! {name} completely blew me away with their incredible customer service and quick work! Absolutely amazing! ❤️🎉",
      "I cannot recommend {name} enough! They are extremely friendly, super fast, and do high-quality work with a smile! Best service ever! ⭐💖",
      "Outstanding experience! {name} is absolute perfection. They are professional, friendly, and deliver results that exceed expectations! 🌟",
      "If you need this service, do not hesitate to contact {name}! They are absolute legends and did a spectacular job for us! 😍🎉",
      "Amazing team and spectacular results! {name} made the whole process super easy, stress-free, and fun! Love their energy! 💖⭐",
      "Absolutely brilliant! {name} did an amazing job and their customer support is the friendliest I've ever encountered! 10/10! 🔥🌟"
    ]
  }
};

module.exports = REVIEW_TEMPLATES;
