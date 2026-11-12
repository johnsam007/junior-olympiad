const rows = source => source.trim().split('\n').map(line => {
  const [answer, art, prompt, detail, wrong] = line.split('|');
  return [answer,art,prompt,detail,undefined,[answer,...wrong.split('/')]];
});

export const extraEvs = {
'All About Me': [
 ['I like to draw.','🎨','Say one thing you like to do.','You can start with “I like to …”','Mira likes to paint. What could Mira say?','I like to paint.','My shoes are red./I am sleepy.','Mira can say “I like to paint” to tell us what she enjoys.'],
 ['My favourite colour is green.','🖍️','Say a colour you like.','You can start with “My favourite colour is …”','Dev likes blue best. Which sentence tells us that?','My favourite colour is blue.','My bag is big./I like to run.','Dev tells us his favourite colour by naming blue.'],
 ['I feel happy today.','😊','Say how you feel today.','You can start with “I feel …”','Tara feels excited about a picnic. What could she say?','I feel excited.','I feel tired./I feel angry.','Tara is excited because she is looking forward to the picnic.'],
 ['I can jump.','🤸','Say something you can do.','You can start with “I can …”','Leela can skip. Which sentence tells us what she can do?','I can skip.','I can swim./I can sing.','Leela can say “I can skip”.'],
 ['I would like to ride a bicycle.','🚲','Say one thing you would like to learn.','You can start with “I would like to learn …”','Arun wants to learn to swim. Which sentence tells us his goal?','I want to learn to swim.','I want to eat lunch./I want to read a story.','Arun names the skill he wants to learn.'],
 ['I am good at building towers.','🧱','Say one thing you are good at.','You can start with “I am good at …”','Kabir is good at building towers. What could he say?','I am good at building towers.','I am good at dancing./I am good at painting.','Kabir names something he does well.']
].map(([answer,art,prompt,detail,practicePrompt,practiceAnswer,wrong,feedback])=>[
 answer,art,prompt,detail,undefined,undefined,undefined,
 [practiceAnswer,'💬',practicePrompt,feedback,undefined,[practiceAnswer,...wrong.split('/')]]
]),
'My family': rows(`
Mother|👩 👧|Mira calls her mother Mum. Who is Mum?|Mum is another word for mother.|Sister/Aunt/Grandmother
Father|👨 👦|Dev calls his father Dad. Who is Dad?|Dad is another word for father.|Brother/Uncle/Grandfather
Brother|🧒 👦|Kabir and Dev have the same parents. How is Dev related to Kabir?|A boy who shares your parents is your brother.|Father/Grandfather/Uncle
Sister|🧒 👧|Tara and Mira have the same parents. How is Mira related to Tara?|A girl who shares your parents is your sister.|Mother/Aunt/Grandmother
Aunt|👩 🏠|Leela’s dad has a sister called Nita. How is Nita related to Leela?|Your parent’s sister is your aunt.|Cousin/Grandmother/Sister
Uncle|👨 🏠|Arun’s mum has a brother called Sam. How is Sam related to Arun?|Your parent’s brother is your uncle.|Grandfather/Father/Brother
Cousin|🧒 🧒|Mira’s aunt has a child called Tara. How is Tara related to Mira?|Your aunt’s child is your cousin.|Aunt/Mother/Grandmother
`),
'Body parts': rows(`
Knees|🦵|What bends in the middle of your legs when you squat?|Your knees bend when you squat.|Elbows/Shoulders/Hands
Elbows|💪|Which joints bend when you bring your hands towards your shoulders?|Your elbows bend in the middle of your arms.|Knees/Ankles/Toes
Teeth|🦷|What helps you bite into an apple?|Your teeth help bite and chew food.|Lips/Hands/Eyes
Fingers|✋|Which parts at the ends of your hands help you pick up a bead?|Your fingers can hold small things.|Toes/Ears/Teeth
Toes|🦶|What are the little parts at the ends of your feet called?|Your toes help you balance.|Fingers/Knees/Elbows
Shoulders|🎒|Where do the straps of a school bag sit?|The straps rest on your shoulders.|Knees/Feet/Hands
`),
'Brushing': rows(`
Toothpaste|🪥|What goes on a toothbrush before brushing?|Put a small amount of toothpaste on the brush.|Soap/Shampoo/Glue
All sides|🦷|Which sides of your teeth should you brush?|Brush the outside, inside and tops of your teeth.|Only the front/Only the top
Gently|🪥|How should you move your brush over your teeth?|Small, gentle movements help clean your teeth.|As hard as you can/Without moving it
Spit it out|🪥|What should you do with toothpaste foam after brushing?|Spit the foam into the sink.|Swallow it/Put it on your towel
Her own brush|🪥 🪥|Which toothbrush should Mira use?|Each person uses their own toothbrush.|Her friend’s brush/Any brush she finds
Two minutes|⏳|About how long should you brush each time?|Try to brush for about two minutes.|Two seconds/Twenty minutes
`),
'My moods': rows(`
Excited|🎈|Mira cannot wait for the party. How might she feel?|Looking forward to something can feel exciting.|Bored/Sleepy
Proud|🧩|Dev finishes a puzzle he worked hard on. How might he feel?|You can feel proud when your effort pays off.|Scared/Lonely
Surprised|🎁|Tara opens a box and finds an unexpected gift. How might she feel?|Something unexpected can make you feel surprised.|Bored/Sleepy
Calm|📖|Arun sits quietly and feels relaxed. How might he feel?|Feeling relaxed and still is feeling calm.|Angry/Scared
Scared|🌩️|A sudden loud bang makes Leela want to hide. How might she feel?|A loud, unexpected sound can make you feel scared.|Proud/Bored
Disappointed|🌧️ 🛝|Kabir wanted to go to the park, but rain stopped the trip. How might he feel?|You can feel disappointed when a plan you liked falls through.|Excited/Proud
`),
'Good habits': rows(`
Take turns|🛝|Mira and Dev both want to use the slide. What can they do?|Taking turns gives each child a chance.|Push ahead/Block the slide
Put them away|🧩 📦|What should Tara do with puzzle pieces after playing?|Putting pieces away keeps them together.|Leave them on the floor/Throw them outside
Wash with soap|🚰 🧼|What should Arun do after using the toilet?|Washing with soap and water helps clean his hands.|Wipe hands on his shirt/Go straight to lunch
Ask first|✏️|What should Leela do before borrowing a classmate’s pencil?|Asking first lets the classmate choose.|Take it quietly/Hide it
Turn off the tap|🚰|What should Kabir do when he has finished washing?|Turning off the tap saves water.|Leave it running/Open it wider
Use a tissue|🤧|Mira has a runny nose. What can she use?|Use a tissue, put it in a bin and wash your hands.|A book/A friend’s sleeve
`),
'Golden words': rows(`
Please|🖍️|Mira wants to borrow a crayon. What can she say when asking?|“May I borrow it, please?” is a polite way to ask.|Sorry/Thank you
Thank you|📕|Dev helps Tara pick up her book. What can Tara say?|Say “thank you” when someone helps you.|Excuse me/Sorry
Sorry|🧃|Arun spills juice on a friend’s drawing. What can he say?|Saying “sorry” shows you care about what happened.|Good morning/Thank you
Excuse me|✋|Leela needs to get a teacher’s attention politely. What can she say?|“Excuse me” is a polite way to get someone’s attention.|Good night/Thank you
You’re welcome|🤝|Kabir says “thank you” to Mira. What can Mira say back?|“You’re welcome” is a friendly reply to “thank you”.|Sorry/Please
Good morning|☀️|Tara greets her teacher at the start of the day. What can she say?|Say “good morning” to greet someone in the morning.|Good night/Sorry
`),
'Plants and their parts': rows(`
Roots|🌱|Which part usually grows down into the soil?|Roots grow down and help hold the plant in place.|Leaves/Flower/Stem
Stem|🌻|Which part carries water from the roots to the leaves?|Water travels up through the stem.|Petal/Fruit/Seed
Petals|🌸|What are the soft coloured pieces of this flower called?|Petals are parts of a flower.|Roots/Seeds/Stems
Seed|🌰|Which part can grow into a new plant?|A seed can sprout when it has the right conditions.|Petal/Stem/Leaf
Fruit|🍎|Which part of an apple tree holds the seeds?|The seeds are inside the fruit.|Stem/Roots/Leaves
Leaves|🍃|Which parts of a plant are often flat and green?|Leaves are often flat and green.|Roots/Petals/Seeds
`),
'Animals and their young ones': rows(`
Lamb|🐑|What is a baby sheep called?|A young sheep is a lamb.|Foal/Calf/Kid
Foal|🐎|What is a baby horse called?|A young horse is a foal.|Lamb/Chick/Puppy
Duckling|🦆|What is a baby duck called?|A young duck is a duckling.|Kitten/Foal/Calf
Cub|🦁|What is a baby lion called?|A young lion is a cub.|Lamb/Puppy/Kid
Piglet|🐖|What is a baby pig called?|A young pig is a piglet.|Duckling/Foal/Kitten
Tadpole|🐸|What do we call a young frog that swims with a tail?|A tadpole grows into a frog.|Chick/Duckling/Calf
`),
'Community helpers': rows(`
Librarian|📚|Who helps Mira find a book in the library?|A librarian helps people find and borrow books.|Carpenter/Farmer/Firefighter
Plumber|🚰|Who can fix a leaking pipe at home?|A plumber repairs pipes and taps.|Teacher/Postal worker/Dentist
Baker|🍞|Who bakes bread in a bakery?|A baker makes bread and other baked foods.|Doctor/Farmer/Police officer
Nurse|🏥|Who cares for patients and checks how they are doing on a hospital ward?|A nurse helps care for people who are ill.|Baker/Carpenter/Librarian
Mechanic|🛠️ 🚗|Who repairs a car at a garage?|A mechanic repairs vehicles.|Teacher/Postal worker/Dentist
Tailor|🧵 👕|Who can make a shirt fit by sewing it?|A tailor makes and alters clothes.|Farmer/Plumber/Firefighter
`),
'Road transport': rows(`
Bus|🚌|Which vehicle can carry a whole class to the zoo?|A bus has room for many passengers.|Bicycle/Auto-rickshaw
Bicycle|🚲|Which vehicle can you move by pushing pedals with your feet?|A bicycle moves when you pedal it.|Bus/Car
Ambulance|🚑|Which road vehicle takes ill or injured people to hospital?|An ambulance carries patients and medical equipment.|Taxi/Delivery truck
Fire engine|🚒|Which road vehicle carries firefighters and their hoses?|A fire engine carries people and tools to fight fires.|Bicycle/Bus
Delivery truck|🚚|Which vehicle has a large space for bringing boxes to shops?|A delivery truck carries goods by road.|Bicycle/Auto-rickshaw
Car|🚗|Which of these usually has four wheels and seats for a small group?|A car usually has four wheels and room for a few people.|Bicycle/Auto-rickshaw
`),
'Water transport': rows(`
Sailboat|⛵|Which boat can use wind to move?|Wind pushes a sailboat’s sails.|Canoe/Jet ski
Canoe|🛶|Which small boat is often moved using a paddle?|A canoe can be moved by paddling.|Cargo ship/Jet ski
Cargo ship|🚢|What carries many heavy containers across the sea?|A cargo ship carries goods across water.|Canoe/Sailboat
Ferry|⛴️|Which boat takes passengers across a river on a regular route?|A ferry carries passengers from one side to the other.|Submarine/Jet ski
Submarine|🌊|Which vehicle can travel beneath the surface of the sea?|A submarine is made to travel underwater.|Sailboat/Ferry
Jet ski|🌊|Which small motor vehicle can one or two people ride on water like a scooter?|A jet ski is a small powered watercraft.|Ferry/Cargo ship
`),
'Air transport': rows(`
Aeroplane|✈️|Which vehicle can carry many passengers between faraway airports?|A passenger aeroplane can take many people a long way.|Hot-air balloon/Kite
Helicopter|🚁|Which vehicle can lift straight up using spinning blades?|A helicopter has spinning blades called rotors.|Aeroplane/Glider
Hot-air balloon|🎈|Which flying vehicle has a basket hanging under a large balloon?|Warm air in the balloon helps it rise.|Helicopter/Aeroplane
Glider|🛩️|Which aircraft can ride air currents without an engine running?|A glider has wings and can stay up using moving air.|Helicopter/Rocket
Rocket|🚀|Which vehicle can launch people into space?|A rocket can travel high enough to reach space.|Aeroplane/Hot-air balloon
Seaplane|🌊 🛩️|Which kind of plane can take off from water?|A seaplane has floats or a hull that lets it take off from water.|Helicopter/Glider
`),
'Seasons in India': rows(`
Summer|☀️ 🧢|It is very hot, and Mira wears a sunhat. Which season might it be?|Summer often brings very hot days.|Winter/Rainy season
Rainy season|🌧️ 💧|It rains on many days and puddles fill the lane. Which season might it be?|Monsoon rain is common in the rainy season.|Winter/Spring
Winter|🧤 🧣|Dev wears gloves on a cold morning in Shimla. Which season might it be?|Many places have their coldest mornings in winter.|Summer/Rainy season
Spring|🌸 🌱|After the cold months, Tara sees new buds opening. Which season might it be?|Many plants grow new buds in spring.|Winter/Summer
Rainy season|☔ 👢|Leela wears rain boots because monsoon showers have started. Which season is it?|Monsoon showers mark the rainy season.|Winter/Summer
Summer|☀️ 🍋|Kabir makes a cool drink on a very hot, dry afternoon. Which season might it be?|In many parts of India, summer can be hot and dry.|Winter/Spring
`),
'Festivals': rows(`
Diwali|🪔 🏠|Mira’s family puts rows of little oil lamps by the door. Which festival might they be celebrating?|Lighting diyas is a Diwali tradition for many families.|Christmas/Holi/Lohri
Christmas|⭐ 🎄|Dev hangs a star above a decorated tree in December. Which festival might it be?|Many families decorate a tree for Christmas.|Diwali/Holi/Baisakhi
Holi|🌈 👕|Tara’s friends play with pink and yellow gulal. Which festival are they celebrating?|Gulal is coloured powder often used at Holi.|Lohri/Christmas/Janmashtami
Raksha Bandhan|🧵|Leela ties a rakhi on her brother’s wrist. Which festival is it?|Tying a rakhi is a Raksha Bandhan tradition.|Holi/Eid/Diwali
Janmashtami|🦚 🪈|Arun sees a little cradle for baby Krishna. Which festival might it be?|Janmashtami celebrates Krishna’s birth.|Dussehra/Holi/Baisakhi
Eid|🌙 🍽️|Kabir’s family shares a festive meal after Ramadan ends. Which festival is it?|Eid al-Fitr is celebrated at the end of Ramadan.|Lohri/Christmas/Diwali
`),
'National Days': rows(`
Republic Day|📅 🇮🇳|Which national day falls on 26 January every year?|26 January is Republic Day.|Independence Day
Independence Day|🇮🇳 📅|Which national day falls on 15 August every year?|15 August is Independence Day.|Republic Day
Republic Day|📜 🇮🇳|Which day marks when India’s Constitution came into effect?|India’s Constitution came into effect on 26 January 1950.|Independence Day
Independence Day|🇮🇳|Which day celebrates India becoming independent in 1947?|India became independent on 15 August 1947.|Republic Day
Republic Day|🎺 🇮🇳|Mira watches the national parade in Delhi on 26 January. Which day is it?|The national parade on 26 January celebrates Republic Day.|Independence Day
Independence Day|🏰 🇮🇳|Dev sees the flag hoisted at the Red Fort on 15 August. Which day is it?|The ceremony at the Red Fort on 15 August marks Independence Day.|Republic Day
`)
};

const pictures = {
 Fruits:'Orange|🍊;Pear|🍐;Pineapple|🍍;Watermelon|🍉;Strawberry|🍓;Cherries|🍒',
 Vegetables:'Cucumber|🥒;Broccoli|🥦;Onion|🧅;Garlic|🧄;Bell pepper|🫑;Sweetcorn|🌽',
 'Domestic animals':'Cat|🐈;Horse|🐎;Pig|🐖;Hen|🐔;Donkey|🫏;Rabbit|🐇',
 'Wild animals':'Zebra|🦓;Rhinoceros|🦏;Hippopotamus|🦛;Kangaroo|🦘;Panda|🐼;Crocodile|🐊',
 'Water animals':'Crab|🦀;Lobster|🦞;Squid|🦑;Jellyfish|🪼;Seal|🦭;Pufferfish|🐡',
 Birds:'Penguin|🐧;Flamingo|🦩;Eagle|🦅;Swan|🦢;Turkey|🦃;Pigeon|🕊️'
};
for (const [deck, entries] of Object.entries(pictures)) {
  extraEvs[deck] = entries.split(';').map(entry => {
    const [answer, art] = entry.split('|');
    return [answer, art, 'What do you see in this picture?', 'This picture shows '+
      (/^[aeiou]/i.test(answer)?'an ':'a ')+answer.toLowerCase()+'.'];
  });
}
extraEvs.Fruits[5][3]='This picture shows two cherries.';
