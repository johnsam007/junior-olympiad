export const extraGenerated = {};

for (let group=0;group<5;group++) {
  const first=group*10+1;
  const title='Counting '+first+'–'+(first+9);
  extraGenerated[title]=[
    ['🟡','How many yellow counters are there?'],
    ['🍎','How many apples are there?'],
    ['🔵','How many blue counters are there?'],
    ['⭐','How many stars are there?'],
    ['🟢','How many green counters are there?'],
    ['🟣','How many purple counters are there?']
  ].map(([picture,prompt],i)=>{
    const n=first+i+1;
    const lines=[];
    for(let remaining=n;remaining>0;remaining-=5) lines.push(picture.repeat(Math.min(remaining,5)));
    return [String(n),lines.join('\n'),prompt,'Count each line once. There are '+n+' in all.',
      undefined,[n-1,n,n+1,n+2].map(String)];
  });
}

extraGenerated['Number order']=[
 [false,[4,1,3]], [true,[15,18,11]], [false,[29,20,24]],
 [true,[32,39,35]], [false,[49,42,46]], [true,[50,44,47]],
 [false,[10,7,9,8]]
].map(([descending,values])=>{
  const ordered=[...values].sort((a,b)=>descending?b-a:a-b);
  return [ordered.join(', '),values.join('　'),
    'Tap the numbers from '+(descending?'biggest to smallest.':'smallest to biggest.'),
    'Start with '+ordered[0]+', then '+(descending?'count down.':'count up.'),
    undefined,null,values.map(String)];
});

const wordsByGroup = [
  [['A','🍎','apple','B','D'],['B','⚽','ball','D','P'],['C','🐱','cat','K','G'],
   ['D','🐕','dog','B','T'],['E','🥚','egg','A','I'],['F','🐟','fish','V','S']],
  [['J','🧃','juice','G','Y'],['K','🪁','kite','B','T'],['L','🍋','lemon','M','N'],
   ['M','🥭','mango','N','L'],['N','🪺','nest','M','R'],['P','🐖','pig','B','R']],
  [['S','☀️','sun','Z','F'],['T','🐯','tiger','D','K'],['U','☂️','umbrella','A','O'],
   ['V','🎻','violin','W','F'],['W','⌚','watch','V','Y'],['Z','🦓','zebra','S','J']]
];
for(const [index,title] of ['Letters A–I','Letters J–R','Letters S–Z'].entries()){
  extraGenerated[title]=wordsByGroup[index].map(([letter,art,word,...wrong],i)=>{
    const lowercase=i%2===1;
    const choices=[letter,...wrong].map(option=>lowercase?option.toLowerCase():option);
    return [choices[0],art,'Which '+(lowercase?'lowercase':'capital')+' letter starts the word '+word+'?',
      word[0].toUpperCase()+word.slice(1)+' starts with the letter '+letter+'.',word,choices];
  });
}
