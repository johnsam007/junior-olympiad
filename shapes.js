export function drawShape(canvas, name) {
  const ctx = canvas.getContext('2d');
  const blue='#83b4f3', light='#c5e1ff', dark='#5485cc', edge='#203d76';
  ctx.strokeStyle=edge;
  ctx.lineWidth=2.5;
  ctx.lineJoin='round';
  function polygon(points, colour=blue) {
    ctx.beginPath();
    points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();
    ctx.fillStyle=colour;
    ctx.fill();
    ctx.stroke();
  }
  function ellipse(x,y,rx,ry,colour) {
    ctx.beginPath();
    ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);
    ctx.fillStyle=colour;
    ctx.fill();
    ctx.stroke();
  }
  switch(name) {
    case 'Square': polygon([[69,16],[151,16],[151,98],[69,98]]);break;
    case 'Rectangle': polygon([[48,23],[172,23],[172,91],[48,91]]);break;
    case 'Triangle': polygon([[110,13],[160,100],[60,100]]);break;
    case 'Circle': ellipse(110,57,43,43,blue);break;
    case 'Heart':
      ctx.beginPath();
      ctx.moveTo(110,98);
      ctx.bezierCurveTo(91,83,62,65,62,42);
      ctx.bezierCurveTo(62,14,94,12,110,36);
      ctx.bezierCurveTo(126,12,158,14,158,42);
      ctx.bezierCurveTo(158,65,129,83,110,98);
      ctx.fillStyle='#f390a1';ctx.fill();ctx.stroke();
      break;
    case 'Star':
      polygon(Array.from({length:10},(_,i)=>{
        const a=i*Math.PI/5-Math.PI/2,r=i%2?23:48;
        return [110+Math.cos(a)*r,57+Math.sin(a)*r];
      }),'#ffcd62');
      break;
    case 'Cube':
    case 'Cuboid': {
      const left=name==='Cube'?66:42, right=name==='Cube'?128:144;
      polygon([[left,39],[left+28,17],[right+28,17],[right,39]],light);
      polygon([[right,39],[right+28,17],[right+28,79],[right,101]],dark);
      polygon([[left,39],[right,39],[right,101],[left,101]]);
      break;
    }
    case 'Cylinder':
      ellipse(110,86,40,14,blue);
      ctx.fillRect(70,30,80,56);
      ctx.beginPath();ctx.moveTo(70,30);ctx.lineTo(70,86);
      ctx.moveTo(150,30);ctx.lineTo(150,86);ctx.stroke();
      ellipse(110,30,40,14,light);
      break;
    case 'Cone':
      polygon([[110,13],[152,86],[68,86]]);
      ellipse(110,86,42,13,light);
      break;
    case 'Hemisphere':
      ctx.beginPath();ctx.arc(110,43,52,0,Math.PI);ctx.closePath();
      ctx.fillStyle=blue;ctx.fill();ctx.stroke();
      ellipse(110,43,52,14,light);
      break;
    case 'Pyramid':
      polygon([[110,11],[149,103],[174,74]],dark);
      polygon([[110,11],[149,103],[47,83]]);
      break;
    case 'Sphere': {
      const shading=ctx.createRadialGradient(94,35,4,110,58,46);
      shading.addColorStop(0,'#f1f8ff');
      shading.addColorStop(.45,blue);
      shading.addColorStop(1,'#3762a6');
      ellipse(110,57,44,44,shading);
      break;
    }
    case 'Prism':
      polygon([[81,30],[139,12],[177,80],[119,99]],light);
      polygon([[81,30],[119,99],[43,99]],dark);
      break;
  }
}
