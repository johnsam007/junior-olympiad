import {extraCards} from './extra-cards.js';
import {extraEvs} from './extra-evs.js';
import {extraGenerated} from './extra-generated.js';

// Rows: answer, illustration, prompt, explanation, spoken example, choices,
// ordered tiles, and an optional row to use in scored modes.
export const subjects = [
  {id:'math', name:'Mathematics', icon:'🔢', subtitle:'Count, compare and spot shapes', topics:[
    ['Comparing Objects','⚖️',[
      ['Size and length','📏',[
        ['Big','🐘　🐁','Is the elephant big or small?','The elephant takes up more space.'],
        ['Small','🐘　🐁','Is the mouse big or small?','The mouse takes up less space.'],
        ['Tall','▂　█','Is the block on the right tall or short?','It reaches higher.'],
        ['Short','▂　█','Is the block on the left tall or short?','It does not reach as high.'],
        ['Long','━━━━━━\n━━','Is the top line long or short?','It stretches farther.'],
        ['Short','━━━━━━\n━━','Is the bottom line long or short?','It does not stretch as far.']]],
      ['Weight and capacity','🥛',[
        ['Heavy','🪨　🪶','Is the rock heavy or light?','A rock is harder to lift than a feather.'],
        ['Light','🪨　🪶','Is the feather heavy or light?','A feather is easy to lift.'],
        ['Full','glasses','Is the glass on the left full or empty?','Water reaches almost to the top.'],
        ['Empty','glasses','Is the glass on the right full or empty?','There is no water in it.']]],
      ['Odd one out','🍎',[['Banana','🍎 🍎 🍌 🍎','Which fruit is different?','The banana is the only yellow fruit.','', ['Apple','Orange','Banana','Pear']]]]
    ]],
    ['Understanding Numbers','🔢',[
      ...Array.from({length:5},(_,group)=>['Counting '+(group*10+1)+'–'+(group*10+10),'🟠',
        Array.from({length:10},(_,i)=>{const n=group*10+i+1;return [String(n),'dots:'+n,'How many dots can you count?','Count each row from left to right.','',[n,n+1,n+2,Math.max(1,n-1)].map(String)];})]),
      ['Before, after and between','🚂',[
        ['6','□　7','Which number comes before 7?','Count 5, 6, 7.','',['5','6','8','9']],
        ['12','11　□','Which number comes after 11?','Count 10, 11, 12.','',['10','13','12','14']],
        ['25','24　□　26','Which number goes between 24 and 26?','Count 24, 25, 26.','',['23','25','27','28']]]],
      ['Comparing numbers','🔎',[
        ['Greater than','8　□　3','How does 8 compare with 3?','8 comes later when you count.'],
        ['Less than','4　□　9','How does 4 compare with 9?','4 comes earlier when you count.'],
        ['Equal to','5　□　5','How does 5 compare with 5?','Both numbers are the same.']]],
      ['Number names 1–20','✏️','One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty'.split('|').map((name,i)=>[name,String(i+1),'What is this number called?'])]
    ]],
    ['Arranging Numbers','🪜',[['Number order','🪜',[
      ['2, 5, 8','8　2　5','Put the numbers in ascending order.','Start with the smallest number.','',null,['8','2','5']],
      ['9, 6, 3','6　3　9','Put the numbers in descending order.','Start with the biggest number.','',null,['6','3','9']],
      ['14, 17, 20','17　20　14','Put the numbers in ascending order.','Count up from the smallest number.','',null,['17','20','14']]]]]],
    ['Shapes','🔺',[
      ['Flat shapes','🔶', 'Square|Triangle|Circle|Rectangle|Heart|Star'.split('|').map(name=>[name,'shape:'+name,'What is this flat shape called?'])],
      ['Solid shapes','🧊','Cube|Cylinder|Cone|Hemisphere|Pyramid|Sphere|Prism|Cuboid'.split('|').map((name,i)=>[name,'shape:'+name,'What is this solid shape called?',['It has six square faces.','It has two flat circular ends.','It has a circular base and one tip.','It looks like half a sphere.','Its triangular sides meet at the top.','It is round like a ball.','This triangular prism has a triangle at each end.','It looks like a brick.'][i]])]
    ]]
  ]},
  {id:'english',name:'English',icon:'🔤',subtitle:'Play with letters, words and sounds',topics:[
    ['Letters of English','🔠',[
      ...['ABCDEFGHI','JKLMNOPQR','STUVWXYZ'].map(letters=>['Letters '+letters[0]+'–'+letters.at(-1),'🔤',[...letters].flatMap(letter=>[
        [letter.toLowerCase(),letter,'Which lowercase letter matches this capital letter?','Both are the letter '+letter+'.'],
        [letter,letter.toLowerCase(),'Which capital letter matches this lowercase letter?','Both are the letter '+letter+'.']
      ])]),
      ['Vowels and consonants','🔡',[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter=>['AEIOU'.includes(letter)?'Vowel':'Consonant',letter,'Is this letter a vowel or a consonant?','A, E, I, O and U are the five vowel letters.','',['Vowel','Consonant']])]
    ]],
    ['Word Formation','🧩',[['Two-letter words','🧩',[
      ...['am|I ___ happy.','an|I ate ___ apple.','as|It is ___ red as a rose.','at|Meet me ___ the gate.','be|Please ___ kind.','go|Let us ___ home.','he|Sam said ___ likes trains.','in|The toy is ___ the box.','is|The sun ___ hot.','it|I found my hat. Here ___ is!','me|Can you help ___?','my|This is ___ bag. It belongs to me.','no|There are ___ apples left. The basket is empty.','of|I had a cup ___ milk.','on|The book is ___ top of the table.','or|Would you like an apple ___ a pear?','so|It was cold, ___ I wore a coat.','to|We walked ___ school.','up|Look ___ at the sky.','us|Come with ___, said the twins.','we|Mum and I are here. ___ came together.'].map(line=>{
        const [word,sentence]=line.split('|');
        const distractors = {
          am:['on','up','to'], an:['go','my','up'], as:['he','we','of'], at:['am','is','my'],
          be:['up','he','in'], go:['is','my','we'], he:['am','at','of'], in:['he','my','be'],
          is:['to','up','my'], it:['to','up','of'], me:['be','am','on'], my:['is','of','to'],
          no:['go','we','he'], of:['am','we','to'], on:['he','be','am'], or:['he','we','is'],
          so:['up','he','is'], to:['be','am','we'], up:['he','we','am'], us:['am','be','of'], we:['up','of','be']
        };
        return [word,sentence,'Which word fills the gap?',sentence.replace('___',word).replace(/^./,c=>c.toUpperCase()),'', [word,...distractors[word]]];
      })
    ]]]],
    ['Vowels','🍎',[
      ['Short vowel sounds','👂',[
        ['a','🍎','Which vowel makes the first sound in apple?','Say apple slowly and listen to the first sound.','Apple'],
        ['e','🥚','Which vowel makes the first sound in egg?','Say egg slowly and listen to the first sound.','Egg'],
        ['i','🖋️','Which vowel makes the first sound in ink?','Say ink slowly and listen to the first sound.','Ink'],
        ['o','🐙','Which vowel makes the first sound in octopus?','Say octopus slowly and listen to the first sound.','Octopus'],
        ['u','☂️','Which vowel makes the first sound in umbrella?','Say umbrella slowly and listen to the first sound.','Umbrella']]],
      ['Magic e','✨',[
        ...['cap|cape|🧢','kit|kite|🪁','hop|hope|🐇','cub|cube|🧊'].map(line=>{const [short,long,icon]=line.split('|');return [long,icon+'　'+short+' + e','What word do we get when we add magic e?','The final e is quiet. The vowel says its name.',short+'. '+long+'.',[short,long]];})
      ]]
    ]],
    ['This and That','🧸',[['Near and far','🧸',[
      ['This','near','The bear is beside me. ___ is my bear.','Use this for something near you.','',['This','That']],
      ['That','far','The bear is across the room. ___ is my bear.','Use that for something farther away.','',['This','That']]]]]],
    ['He and She','👧',[['He and she','👧',[
      ['He','👦 📚','This is Ravi. ___ is reading.','Ravi is a boy. He is reading.','',['He','She']],
      ['She','👧 🎨','This is Asha. ___ is painting.','Asha is a girl. She is painting.','',['He','She']]]]]],
    ['A and An','🍏',[['A and an','🍏',[
      ...['ball|⚽','apple|🍎','egg|🥚','cat|🐱','umbrella|☂️','kite|🪁'].map(line=>{const [word,icon]=line.split('|');const vowel=/^[aeiou]/.test(word);return [vowel?'An':'A',icon,'Do we say a '+word+' or an '+word+'?', (vowel?'An':'A')+' '+word+'. Listen to the first sound in '+word+'.','',['A','An']];})
    ]]]],
    ['Action Words','🤸',[['Actions','🤸',[
      ...'Sitting|🧒🪑;Jumping|🤸;Writing|✍️;Reading|📖;Eating|🍽️;Drawing|🖍️;Running|🏃;Dancing|💃;Watching|👀📺;Kicking|🦵⚽;Playing|🧒🧩;Clapping|👏;Swimming|🏊;Sleeping|😴;Walking|🚶'.split(';').map(line=>{const [name,icon]=line.split('|');return [name,icon,'Which action does the picture show?'];})
    ]]]]
  ]},
  {id:'evs',name:'EVS',icon:'🌱',subtitle:'Explore people, nature and our world',topics:[
    ['Me and My Family','🏡',[
      ['All About Me','💬',[
        ['Say it aloud','👋','Say your name aloud.','You can say “My name is …”','',['Write it online','Say it aloud']],
        ['Say it aloud','🎨','Tell someone about a game you like.','You can say “I like to play …”','',['Say it aloud','Type it here']]]],
      ['My family','🏡',[['Grandmother','👵','What can you call your parent’s mother?','Grandma is another word for grandmother.'],['Grandfather','👴','What can you call your parent’s father?','Grandpa is another word for grandfather.']]],
      ['Body parts','👋',[
        ['Eyes','👀','What do you use to see?'],['Ears','👂','What do you use to hear?'],['Nose','👃','What do you use to smell?'],['Hands','🤲','What do you use to hold a cup?'],['Feet','🦶','What do you stand on?'],['Tongue','👅','Which body part helps you taste?']]],
      ['Brushing','🪥',[['Toothbrush','🪥','What do you brush your teeth with?','Use a toothbrush and toothpaste.','',['Comb','Toothbrush','Towel']],['Morning and night','☀️ 🌙','When should you brush your teeth?','Brush in the morning and before bed.','',['Morning and night','Only on Sundays','Only at lunch']]]],
      ['My moods','😊',[['Happy','😊','How might this smiling child feel?'],['Sad','😢','How might this crying child feel?'],['Angry','😠','How might this child feel?'],['Worried','😟','How might this child feel?']]],
      ['Good habits','🧼',[['Wash your hands','🧼','What should you do before you eat?','Soap and water help clean your hands.'],['Put it in a bin','🗑️','Where should you put a used wrapper?','A bin helps keep our space clean.'],['Cover your mouth','🤧','What should you do when you cough?','Cough into a bent elbow or a tissue.']]],
      ['Golden words','💛',[['Please','🙏','What can you say when you ask for help?'],['Thank you','🎁','What can you say when someone gives you a gift?'],['Sorry','🧱','You knocked over a friend’s blocks. What can you say?'],['Excuse me','🚶','What can you say to pass someone politely?']]]
    ]],
    ['Plants, Birds and Animals','🌿',[
      ['Plants and their parts','🌱',[
        ['Roots','🌱','Which part takes in water from the soil?'],['Stem','🌷','Which part holds up the leaves and flower?'],['Leaves','🍃','Which parts use light to help make food for the plant?'],['Flower','🌻','Which part of a sunflower has yellow petals?']]],
      ['Fruits','🍎',identify('Apple|🍎;Banana|🍌;Mango|🥭;Grapes|🍇','fruit')],
      ['Vegetables','🥕',identify('Carrot|🥕;Potato|🥔;Peas|🫛;Brinjal|🍆','vegetable')],
      ['Domestic animals','🐄',identify('Cow|🐄;Goat|🐐;Dog|🐕;Sheep|🐑','domestic animal')],
      ['Wild animals','🐅',identify('Tiger|🐅;Lion|🦁;Elephant|🐘;Giraffe|🦒','wild animal')],
      ['Animals and their young ones','🐣',[
        ['Calf','🐄','What is a baby cow called?'],['Puppy','🐕','What is a baby dog called?'],['Kitten','🐈','What is a baby cat called?'],['Chick','🐔','What is a baby hen called?'],['Kid','🐐','What is a baby goat called?']]],
      ['Water animals','🐬',identify('Dolphin|🐬;Octopus|🐙;Shark|🦈;Whale|🐋','water animal')],
      ['Birds','🦜',identify('Parrot|🦜;Peacock|🦚;Owl|🦉;Duck|🦆','bird')]
    ]],
    ['People Who Help Us','🩺',[['Community helpers','🤝',[
      ['Doctor','🩺','Who checks you when you are ill?'],['Teacher','📚','Who helps you learn in class?'],['Police officer','👮','Who helps keep people safe and responds when a crime is reported?'],['Carpenter','🪚','Who makes or repairs wooden furniture?'],['Farmer','🌾','Who grows crops for food?'],['Traffic police officer','🚦','Who directs traffic at a busy crossing?'],['Firefighter','🚒','Who helps put out fires?'],['Postal worker','📬','Who delivers letters?'],['Dentist','🦷','Who looks after your teeth?']
    ]]]],
    ['Transport','🚌',[
      ['Road transport','🚌',identify('Bus|🚌;Car|🚗;Bicycle|🚲;Auto-rickshaw|🛺','road vehicle')],
      ['Water transport','⛵',identify('Sailboat|⛵;Ship|🚢;Canoe|🛶','water vehicle')],
      ['Air transport','✈️',identify('Aeroplane|✈️;Helicopter|🚁;Hot-air balloon|🎈','air vehicle')]
    ]],
    ['Seasons','🌦️',[['Seasons in India','🌦️',[
      ['Summer','☀️ 🥭','Which season often brings hot days and ripe mangoes?'],['Winter','🧣','In which season might you wear a sweater on a chilly morning?'],['Spring','🌷','In which season after winter do many flowers bloom?'],['Rainy season','☔ 🌧️','In which season do many parts of India get monsoon rain?']
    ]]]],
    ['Festivals and National Days','🪔',[
      ['Festivals','🎉',[
        ['Lohri','🔥','At which January festival in Punjab do many families gather around a bonfire?'],
        ['Holi','🌈','At which festival do many people play with coloured powder?'],
        ['Baisakhi','🌾','Which April festival marks the spring harvest in Punjab?'],
        ['Raksha Bandhan','🧵','At which festival do sisters often tie a rakhi?'],
        ['Janmashtami','🦚','Which festival celebrates the birth of Krishna?'],
        ['Dussehra','🏹','At which festival do many people watch an effigy of Ravana burn?'],
        ['Diwali','🪔','At which festival do many families light rows of diyas?'],
        ['Christmas','🎄','Which festival celebrates the birth of Jesus on 25 December?'],
        ['Eid','🌙','Which festival, also called Eid al-Fitr, marks the end of Ramadan?']]],
      ['National Days','🇮🇳',[
        ['Republic Day','🇮🇳　26 January','Which national day do we celebrate on 26 January?','India’s Constitution came into effect on this day in 1950.','',['Republic Day','Independence Day']],
        ['Independence Day','🇮🇳　15 August','Which national day do we celebrate on 15 August?','India became independent on this day in 1947.','',['Republic Day','Independence Day']]]]
    ]]
  ]}
];

const expansion = {...extraCards,...extraEvs,...extraGenerated};
for (const subject of subjects) {
  for (const [, , decks] of subject.topics) {
    for (const [title, , cards] of decks) {
      cards.push(...expansion[title]);
    }
  }
}

function identify(entries, kind) {
  return entries.split(';').map(entry => {
    const [name, picture] = entry.split('|');
    return [name, picture, 'Which '+kind+' do you see?'];
  });
}
