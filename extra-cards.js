// One row per card: answer | picture | prompt | feedback | distractors | spoken example.
const rows = source => source.trim().split('\n').map(line => {
  const [answer, art, prompt, detail, wrong, example] = line.split('|');
  return [answer, art, prompt, detail, example, [answer, ...wrong.split('/')]];
});

export const extraCards = {
'Size and length': rows(`
Big|🐋 🐟|Which word describes the whale?|A whale is much bigger than the little fish.|Small/Short
Small|🏠 🐜|Which word describes the ant?|An ant is small enough to sit on a leaf.|Big/Tall
Tall|🌳 🌱|Which word describes the tree?|The top of the tree reaches higher.|Short/Empty
Short|🕯️ ▂|The block reaches lower than the candle. Is the block tall or short?|Its top is lower, so it is short.|Tall
Long|━━━━━━　━━━|Which word describes the line on the left?|It stretches farther across the picture.|Short
Short|━━　━━━━━━|Which word describes the line on the left?|It stretches a smaller distance.|Long
`),
'Weight and capacity': rows(`
Heavy|🧱 🍃|Which word describes the brick compared with the leaf?|The brick is harder to lift.|Light
Light|🎈 🪨|Which word describes the balloon compared with the rock?|The balloon is easier to lift.|Heavy
Full|glasses|Which word describes the glass with more water?|The glass on the left is filled with water.|Empty
Empty|🧺|Mina takes every toy out of her basket. What is the basket like now?|An empty basket has nothing inside.|Full
Heavy|🍉 🍇|Which word describes the watermelon compared with one grape?|The watermelon weighs more.|Light
Full|🪣|Zoya fills a bucket right to the top. How is the bucket now?|It is full because there is no space for more water.|Empty
`),
'Odd one out': rows(`
Carrot|🍌 🍎 🥕 🍇|Which one is a vegetable?|A carrot is a vegetable. The others are fruits.|Banana/Apple/Grapes
Bus|🐕 🚌 🐈 🐇|Which one is a vehicle?|A bus takes people places. The others are animals.|Dog/Cat/Rabbit
Circle|🔺 ⚪ 🔺 🔺|Which shape has no corners?|A circle has a curved edge and no corners.|Triangle/Square
Moon|⭐ ⭐ 🌙 ⭐|Which picture is different?|The moon is a crescent. The other pictures are stars.|Star/Sun
Cup|🥄 🥄 🥄 ☕|Which one can hold a drink?|A cup holds a drink. The other objects are spoons.|Spoon/Plate
Boot|🧤 🧤 🥾 🧤|Which item goes on your foot?|A boot goes on your foot. Gloves go on your hands.|Glove/Hat
Bird|🐠 🐟 🐦 🐡|Which animal has feathers?|The bird has feathers. The others are fish.|Goldfish/Pufferfish
`),
'Before, after and between': rows(`
2|□　3|Which number comes just before 3?|Count 1, 2, 3.|1/4/5
9|8　□|Which number comes just after 8?|Count 7, 8, 9.|7/8/10
10|9　□　11|Which number is between 9 and 11?|Count 9, 10, 11.|8/12/11
19|□　20|Which number comes just before 20?|Count 18, 19, 20.|18/20/21
31|30　□|Which number comes just after 30?|Count 29, 30, 31.|29/30/32
40|39　□　41|Which number is between 39 and 41?|Count 39, 40, 41.|38/39/42
`),
'Comparing numbers': rows(`
Greater than|12　□　7|How does 12 compare with 7?|12 comes after 7 when you count.|Less than/Equal to
Less than|19　□　21|How does 19 compare with 21?|19 comes before 21 when you count.|Greater than/Equal to
Equal to|30　□　30|How does 30 compare with 30?|Both numbers are the same.|Greater than/Less than
Greater than|49　□　45|How does 49 compare with 45?|49 comes after 45 when you count.|Less than/Equal to
Less than|8　□　18|How does 8 compare with 18?|8 comes before 18 when you count.|Greater than/Equal to
Equal to|🍎🍎🍎　🍐🍐🍐|How does the number of apples compare with the number of pears?|There are three of each fruit.|Greater than/Less than
`),
'Number names 1–20': rows(`
3|Three|Which number matches the word three?|Three is written as 3.|2/4/5
7|Seven|Which number matches the word seven?|Seven is written as 7.|6/8/9
11|Eleven|Which number matches the word eleven?|Eleven is written as 11.|10/12/20
15|Fifteen|Which number matches the word fifteen?|Fifteen is written as 15.|5/14/16
18|Eighteen|Which number matches the word eighteen?|Eighteen is written as 18.|8/17/19
20|Twenty|Which number matches the word twenty?|Twenty is written as 20.|2/12/19
`),
'Flat shapes': rows(`
Circle|🕒|What shape is the face of this clock?|Its outline is round, like a circle.|Square/Triangle/Star
Rectangle|🚪|What shape is the front of this door?|Its outline has four square corners and two longer sides.|Circle/Triangle/Square
Triangle|🍕|What shape does this pizza slice look like?|Its outline is roughly a triangle with a pointed tip.|Circle/Heart/Square
Heart|💌|What shape is on this envelope?|The symbol has two rounded tops and a point below.|Star/Circle/Triangle
Star|🌟|Which shape has the points you see here?|This star has five points.|Circle/Rectangle/Heart
Square|shape:Square|Which flat shape has four equal sides and four square corners?|A square has four equal sides and four right angles.|Circle/Triangle/Heart
`),
'Solid shapes': rows(`
Sphere|⚽|What solid shape is a football like?|A football is round in every direction.|Cube/Cone/Cylinder
Cylinder|🥫|What solid shape is this tin like?|It has a circle at each end and a curved side.|Sphere/Pyramid/Cuboid
Cone|🍦|What solid shape is the wafer part?|It has a round opening and comes to a point.|Sphere/Cube/Cylinder
Cuboid|🧱|What solid shape is a brick usually like?|A brick has rectangular faces and looks like a box.|Sphere/Cone/Pyramid
Cube|🎲|What solid shape is a die like?|A die has six square faces.|Cuboid/Cone/Sphere
Hemisphere|shape:Hemisphere|What is half of a sphere called?|A hemisphere has a curved surface and one flat circular face.|Cylinder/Cone/Cube
`),
'Vowels and consonants': rows(`
A|B　A　D|Which letter in this group is a vowel?|A is one of the five vowel letters.|B/D
E|P　T　E|Which letter in this group is a vowel?|E is a vowel letter.|P/T
I|I　K　M|Which letter in this group is a vowel?|I is a vowel letter.|K/M
O|S　O　N|Which letter in this group is a vowel?|O is a vowel letter.|S/N
U|R　L　U|Which letter in this group is a vowel?|U is a vowel letter.|R/L
B|E　B　A|Which letter in this group is a consonant?|B is a consonant. A and E are vowels.|E/A
`),
'Two-letter words': rows(`
on|📕 🪑|The book is ___ the chair.|The book rests on top of the chair.|am/at/be
up|👀 ☁️|Look ___ at the clouds.|Up means towards the sky.|we/is/of
in|🧸 📦|The toy is ___ the closed box.|In means inside the box.|go/my/us
my|🎒|This is ___ bag. It belongs to me.|My shows something belongs to the speaker.|we/to/be
no|🧺|There are ___ oranges left. The basket is empty.|No oranges means there are zero oranges.|he/go/we
or|🍇 🍐|Choose grapes ___ pears. Pick just one.|Or gives you a choice.|my/is/he
`),
'Short vowel sounds': rows(`
a|🐜|Which vowel starts the word ant?|Ant begins with short a, like apple.|e/i/u|Ant
e|🛏️|Which vowel is in the middle of bed?|Bed has short e, like red.|a/i/o|Bed
i|🐟|Which vowel comes after f in fish?|Fish has short i, like fin.|e/a/u|Fish
o|🍲|Which vowel is in the middle of pot?|Pot has short o, like hot.|a/e/u|Pot
u|☀️|Which vowel is in the middle of sun?|Sun has short u, like cup.|o/a/i|Sun
Pen|🖊️|Which word has the same middle sound as hen?|Pen and hen share the short e sound.|Pin/Pan/Pun|Hen. Pen.
`),
'Magic e': rows(`
tape|tap + e|Which word does magic e make?|In tape, a says its letter name.|tap/tip|Tap. Tape.
made|mad + e|Which word does magic e make?|In made, a says its letter name.|mad/mud|Mad. Made.
hide|hid + e|Which word does magic e make?|In hide, i says its letter name.|hid/had|Hid. Hide.
pine|pin + e|Which word does magic e make?|In pine, i says its letter name.|pin/pan|Pin. Pine.
note|not + e|Which word does magic e make?|In note, o says its letter name.|not/net|Not. Note.
cute|cut + e|Which word does magic e make?|In cute, u says its letter name.|cut/cat|Cut. Cute.
`),
'Near and far': rows(`
This|🤲 🍎|I am holding an apple. ___ is my apple.|Use this when the apple is right here.|That
That|🧒 ··· 🚌|The bus is across the road. ___ is my bus.|Use that for something farther away.|This
This|✋ 📕|The book is in my hand. ___ is my book.|Use this for something you are holding.|That
That|🧒 ··· 🌳|The tree is far away. ___ is a mango tree.|Use that for the faraway tree.|This
This|🤲 🐚|The shell is in my palm. ___ is my shell.|The shell is close, so use this.|That
That|🧒 ··· 🪁|The kite is high above me. ___ is my kite.|The kite is far away, so use that.|This
`),
'He and she': rows(`
She|👧 🚲|Mira is a girl. ___ is riding a bicycle.|Use she for Mira in this sentence.|He
He|👦 🎨|Arun is a boy. ___ is painting.|Use he for Arun in this sentence.|She
She|👧 🎵|Tara is a girl. ___ is singing.|Use she for Tara in this sentence.|He
He|👦 🪁|Dev is a boy. ___ is flying a kite.|Use he for Dev in this sentence.|She
She|👧 🏊|Leela is a girl. ___ is swimming.|Use she for Leela in this sentence.|He
He|👦 🍌|Kabir is a boy. ___ is eating a banana.|Use he for Kabir in this sentence.|She
`),
'A and an': rows(`
An|🐜|I see ___ ant.|Ant starts with a vowel sound. Say an ant.|A
A|🐕|I see ___ dog.|Dog starts with a consonant sound. Say a dog.|An
An|🐙|I see ___ octopus.|Octopus starts with a vowel sound. Say an octopus.|A
A|🚂|I see ___ train.|Train starts with a consonant sound. Say a train.|An
An|✉️|I have ___ envelope.|Envelope starts with a vowel sound. Say an envelope.|A
A|🍐|I have ___ pear.|Pear starts with a consonant sound. Say a pear.|An
`),
'Actions': rows(`
Brushing|🪥|What is Tara doing with a toothbrush?|She is brushing her teeth.|Combing/Reading/Clapping
Pouring|🥛 ➡️ ☕|Dev tips milk from one cup to another. What is he doing?|Moving a drink this way is pouring.|Jumping/Reading/Kicking
Digging|🪏 🌱|Leela makes a hole in soil with a spade. What is she doing?|Making a hole in soil is digging.|Dancing/Singing/Clapping
Waving|👋|Mira moves her hand to say hello. What is she doing?|Moving your hand to greet someone is waving.|Clapping/Writing/Running
Sweeping|🧹|Arun uses a broom on the floor. What is he doing?|Cleaning with a broom is sweeping.|Drawing/Kicking/Sitting
Singing|🎤 🎵|Kabir uses his voice to make a tune. What is he doing?|Making a tune with your voice is singing.|Watching/Reading/Drawing
`)
};
