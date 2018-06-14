pir=180.0/Math.PI;
al_r1=0;de_r1=0;al_r2=0;de_r2=0;
al_1950=0;de_1950=0;al_1875=0;de_1875=0;
lam_r1=0;bet_r1=0;inc_r1=0;lam_r2=0;bet_r2=0;inc_r2=0;
ll_r1=0;bb_r1=0;
vin_1=0;vin_2=0;vin_3=0;

function getequ(form)
{
var l_h1 = Math.floor(form.inputbox1.value);
var l_m1 = Math.floor(form.inputbox2.value);
var d_s1 = parseFloat(form.inputbox3.value);
var l_d1 = Math.floor(form.inputbox5.value);
var l_am1 = Math.floor(form.inputbox6.value);
var d_as1 = parseFloat(form.inputbox7.value);
var al_d1 = parseFloat(form.inputbox8.value);
var de_d1 = parseFloat(form.inputbox9.value);
al_r1 = parseFloat(form.inputbox10.value);
de_r1 = parseFloat(form.inputbox11.value);
var epoch1 = Math.floor(form.inputbox23.value);
var epoch2 = Math.floor(form.inputbox24.value);

if(l_h1<0||l_h1>23){alert("First source RA out of range 0-23 h");return;}	
if(l_m1<0||l_m1>59){alert("First source RA out of range 0-59 m");return;}	
if(d_s1<0||d_s1>=60){alert("First source RA out of range 0-60 s");return;}	
if(l_d1<-90||l_d1>90){alert("First source Dec out of range -90-+90 deg");return;}	
if(l_am1<0||l_am1>59){alert("First source Dec out of range 0-59'");return;}	
if(d_as1<0||d_as1>=60){alert("First source Dec out of range 0-60''");return;}	
if(al_d1<0||al_d1>=360){alert("First source RA out of range 0-360 deg");return;}	
if(de_d1<-90||de_d1>90){alert("First source Dec out of range -90-+90 deg");return;}	
if(al_r1<0||al_r1>=2*Math.PI){alert("First source RA out of range 0-2*PI radians");return;}	
if(de_r1<(-1)*Math.PI/2||de_r1>Math.PI/2){alert("First source Dec out of range -PI/2-+PI/2 radians");return;}	
if(epoch1<1000||epoch1>3000){alert("Invalid initial epoch");return;}
if(epoch2<1000||epoch2>3000){alert("Invalid finish epoch");return;}
if(epoch1==epoch2){epoch2=epoch1+10;form.inputbox24.value=epoch2;}

if(l_h1+l_m1+d_s1+Math.abs(l_d1)+l_am1+d_as1+al_d1+Math.abs(de_d1)+al_r1+Math.abs(de_r1)==0)
	{al_r1=0;de_r1=0;}
	else{
		if(l_h1+l_m1+d_s1+Math.abs(l_d1)+l_am1+d_as1>0)	{
		al_d1 = parseFloat((l_h1+l_m1/60.0+d_s1/3600.0)*15.0);
		if(l_d1>=0) {de_d1 = parseFloat(l_d1+l_am1/60.0+d_as1/3600.0);}
		else {de_d1 = parseFloat(l_am1/60.0+d_as1/3600.0-l_d1);}
		if(form.inputbox4.checked || l_d1<0) de_d1 = de_d1*(-1.0);
	if(de_d1<-90 || de_d1>90){alert("First source Dec out of range -90-+90 deg");return;}
		al_r1 = al_d1/pir;
		de_r1 = de_d1/pir;}
		else{
			if(al_d1+Math.abs(de_d1)>0){
			al_r1 = al_d1/pir;
			de_r1 = de_d1/pir;}
		}
	}

if(epoch1!=1950) prmat(epoch1,1950);
else {al_1950=al_r1;de_1950=de_r1;}
if(epoch2!=1950) prmat(1950,epoch2);
else{al_r2=al_1950;de_r2=de_1950;}
ecleq(1,al_r1,de_r1,epoch1);
lam_r1=lam_r2;
bet_r1=bet_r2;
inc_r1=inc_r2;
ecleq(1,al_r2,de_r2,epoch2);
galequ(1,al_1950,de_1950);
outprint(form);
return;
}

function getecl(form)
{
var epoch1 = Math.floor(form.inputbox23.value);
var epoch2 = Math.floor(form.inputbox24.value);
var lam_d1 = parseFloat(form.inputbox25.value);
var bet_d1 = parseFloat(form.inputbox26.value);
lam_r1 = parseFloat(form.inputbox27.value);
bet_r1 = parseFloat(form.inputbox28.value);
if(lam_d1<0||lam_d1>=360){alert("Ecliptic longitude out of range 0-360 deg");return;}	
if(bet_d1<-90||bet_d1>90){alert("Ecliptic lattitude out of range -90-+90 deg");return;}	
if(lam_r1<0||lam_r1>=2*Math.PI){alert("Ecliptic longitude of range 0-2*PI radians");return;}	
if(bet_r1<(-1)*Math.PI/2||bet_r1>Math.PI/2){alert("Ecliptic lattitude out of range -PI/2-+PI/2 radians");return;}	
if(epoch1<1000||epoch1>3000){alert("Invalid initial epoch");return;}
if(epoch2<1000||epoch2>3000){alert("Invalid finish epoch");return;}
if(epoch1==epoch2){alert("Change initial or finish epoch");return;}

if(lam_d1+Math.abs(bet_d1)!=0){lam_r1=lam_d1/pir; bet_r1=bet_d1/pir;}
ecleq(-1,lam_r1,bet_r1,epoch1);
al_r1=al_r2;
de_r1=de_r2;
if(epoch1!=1950) prmat(epoch1,1950);
else{al_1950=al_r1;de_1950=de_r1;}
if(epoch2!=1950) prmat(1950,epoch2);
else{al_r2=al_1950;de_r2=de_1950;}
ecleq(1,al_r1,de_r1,epoch1);
inc_r1=inc_r2;
ecleq(1,al_r2,de_r2,epoch2);
galequ(1,al_1950,de_1950);
outprint(form);
return;
}

function getgal(form)
{
var epoch1 = Math.floor(form.inputbox23.value);
var epoch2 = Math.floor(form.inputbox24.value);
var ll_d0 = Math.floor(form.inputbox35a.value);
var ll_m0 = Math.floor(form.inputbox35b.value);
var ll_s0 = parseFloat(form.inputbox35c.value);
var bb_d0 = Math.floor(form.inputbox36b.value);
var bb_m0 = Math.floor(form.inputbox36c.value);
var bb_s0 = parseFloat(form.inputbox36d.value);
var ll_d1 = parseFloat(form.inputbox35.value);
var bb_d1 = parseFloat(form.inputbox36.value);
ll_r1 = parseFloat(form.inputbox37.value);
bb_r1 = parseFloat(form.inputbox38.value);
if(ll_d0<0||ll_d0>359){alert("Galactic longitude out of range 0-360 deg");return;}	
if(ll_m0<0||ll_m0>59){alert("Galactic longitude out of range 0-59'");return;}	
if(ll_s0<0||ll_s0>=60){alert("Galactic longitude out of range 0-60''");return;}	
if(bb_d0<-90||bb_d0>90){alert("Galactic lattitude out of range -90-+90 deg");return;}	
if(bb_m0<0||bb_m0>59){alert("Galactic lattitude out of range 0-59'");return;}	
if(bb_s0<0||bb_s0>=60){alert("Galactic lattitude out of range 0-60''");return;}	
if(ll_d1<0||ll_d1>=360){alert("Galactic longitude out of range 0-360 deg");return;}	
if(bb_d1<-90||bb_d1>90){alert("Galactic lattitude out of range -90-+90 deg");return;}	
if(ll_r1<0||ll_r1>=2*Math.PI){alert("Galactic longitude of range 0-2*PI radians");return;}	
if(bb_r1<(-1)*Math.PI/2||bb_r1>Math.PI/2){alert("Galactic lattitude out of range -PI/2-+PI/2 radians");return;}	
if(epoch1<1000||epoch1>3000){alert("Invalid initial epoch");return;}
if(epoch2<1000||epoch2>3000){alert("Invalid finish epoch");return;}
if(epoch1==epoch2){alert("Change initial or finish epoch");return;}

if(ll_d1+Math.abs(bb_d1)+ll_r1+Math.abs(bb_r1)+ll_d0+ll_m0+ll_s0+Math.abs(bb_d0)+bb_m0+bb_s0!=0)
	{
	if(ll_d0+ll_m0+ll_s0+Math.abs(bb_d0)+bb_m0+bb_s0!=0){
		var ll_dd = parseFloat(ll_d0+ll_m0/60.0+ll_s0/3600.0);
		if(bb_d0>=0) {var bb_dd = parseFloat(bb_d0+bb_m0/60.0+bb_s0/3600.0);}
		else {var bb_dd = parseFloat(bb_m0/60.0+bb_s0/3600.0-bb_d0);}
		if(form.inputbox36a.checked || bb_d0<0) bb_dd = bb_dd*(-1.0);
	if(bb_dd<-90||bb_dd>90){alert("Galactic lattitude out of range -90-+90 deg");return;}
		ll_r1 = ll_dd/pir;
		bb_r1 = bb_dd/pir;}	
	else {
		if(ll_d1+Math.abs(bb_d1!=0)){ll_r1=ll_d1/pir; bb_r1=bb_d1/pir;}
		}
	}
galequ(-1,ll_r1,bb_r1);
if(epoch1!=1950) {prmat(1950,epoch1);al_r1=al_r2;de_r1=de_r2;}
else {al_r1=al_1950;de_r1=de_1950;}
if(epoch2!=1950) prmat(1950,epoch2);
else {al_r2=al_1950;de_r2=de_1950;}
ecleq(1,al_r1,de_r1,epoch1);
lam_r1=lam_r2;
bet_r1=bet_r2;
inc_r1=inc_r2;
ecleq(1,al_r2,de_r2,epoch2);
outprint(form);
return;
}

function outprint(form)
{
form.inputbox8.value=ring(al_r1*pir,6);
form.inputbox9.value=ring(de_r1*pir,6);
form.inputbox10.value=ring(al_r1,7);
form.inputbox11.value=ring(de_r1,7);
vingms(al_r1/15.0);
form.inputbox1.value=vin_1;
form.inputbox2.value=vin_2;
form.inputbox3.value=ring(vin_3,2);
vingms(de_r1);
form.inputbox6.value=vin_2;
form.inputbox7.value=ring(vin_3,1);
if(de_r1<0.0 && vin_1==0) form.inputbox5.value="-0";
else form.inputbox5.value=vin_1;

form.inputbox19.value=ring(al_r2*pir,6);
form.inputbox20.value=ring(de_r2*pir,6);
form.inputbox21.value=ring(al_r2,7);
form.inputbox22.value=ring(de_r2,7);
vingms(al_r2/15.0);
form.inputbox12.value=vin_1;
form.inputbox13.value=vin_2;
form.inputbox14.value=ring(vin_3,2);
vingms(de_r2);
form.inputbox17.value=vin_2;
form.inputbox18.value=ring(vin_3,1);
if(de_r2<0.0 && vin_1==0) form.inputbox16.value="-0";
else form.inputbox16.value=vin_1;

form.inputbox25.value=ring(lam_r1*pir,6);
form.inputbox26.value=ring(bet_r1*pir,6);
form.inputbox27.value=ring(lam_r1,7);
form.inputbox28.value=ring(bet_r1,7);
form.inputbox29.value=ring(inc_r1*pir,6);
form.inputbox30.value=ring(lam_r2*pir,6);
form.inputbox31.value=ring(bet_r2*pir,6);
form.inputbox32.value=ring(lam_r2,7);
form.inputbox33.value=ring(bet_r2,7);
form.inputbox34.value=ring(inc_r2*pir,6);

form.inputbox35.value=ring(ll_r1*pir,3);
form.inputbox36.value=ring(bb_r1*pir,3);
form.inputbox37.value=ring(ll_r1,4);
form.inputbox38.value=ring(bb_r1,4);
vingms(ll_r1);
form.inputbox35a.value=vin_1;
form.inputbox35b.value=vin_2;
form.inputbox35c.value=ring(vin_3,1);
vingms(bb_r1);
form.inputbox36c.value=vin_2;
form.inputbox36d.value=ring(vin_3,1);
if(bb_r1<0.0 && vin_1==0) form.inputbox36b.value="-0";
else form.inputbox36b.value=vin_1;

prmat(1950,1875);
form.outbox1.value=cns_pick(al_1875,de_1875);
return;
}

function vingms(vinrad)
{
var vin_d = vinrad*pir;
var vin_dd = Math.abs(vin_d)+0.1e-5;
vin_1 = Math.floor(vin_dd);
vin_2 = Math.floor((vin_dd - vin_1)*60);
vin_3 = parseFloat((vin_dd - vin_1 - vin_2/60.0)*3600.0);		
if(vin_d<0.0) vin_1=vin_1*(-1.0);
return;
}

function ecleq(sw,x,y,year)
{
var mjd = jday (year,3,21);
var eps = obliquity (mjd);		
var deps = nutation (mjd); 		    
eps += deps;      	        	 
var seps = Math.sin(eps);
var ceps = Math.cos(eps);
var sy = Math.sin(y);
var cy = Math.cos(y);				
if (Math.abs(cy)<1e-20) cy = 1e-20;		
var ty = sy/cy;
var cx = Math.cos(x);
var sx = Math.sin(x);
var q = Math.asin((sy*ceps)-(cy*seps*sx*sw));
var p = Math.atan(((sx*ceps)+(ty*seps*sw))/cx);
if (cx<0) p += Math.PI;		
if (p < 0) p += 2*Math.PI;
if (p > 2*Math.PI) p -= 2*Math.PI;
if(sw==1) {lam_r2 = p; bet_r2 = q;}
else {al_r2 = p; de_r2 = q;}
inc_r2=eps;
return;
}

function obliquity (mjd)
{
var t = (mjd - 2451545.0)/36525.;
var lasteps = (23.4392911 + t*(-46.8150 + t*(-0.00059 + t*(  0.001813 )))/3600.0)/pir;
return (lasteps);
}

function nutation (mjd)
{ 				
var i=0;
var isecul=0;				
var delcache=new Array(45);

var delaunay = new Array(
485866.733,  1717915922.633, 31.310,  0.064,1287099.804, 129596581.224,  -0.577, -0.012, 
335778.877,  1739527263.137, -13.257, 0.011,1072261.307, 1602961601.328, -6.891,  0.019, 
450160.280,  -6962890.539,   7.455,   0.008 );

var multarg = new Array (
0, 0, 0, 0, 1,0, 0, 0, 0, 2,-2, 0, 2, 0, 1,2, 0, -2, 0, 0,
-2, 0, 2, 0, 2,1, -1, 0, -1, 0,0, -2, 2, -2, 1,2, 0, -2, 0, 1,
0, 0, 2, -2, 2,0, 1, 0, 0, 0,0, 1, 2, -2, 2,0, -1, 2, -2, 2,
0, 0, 2, -2, 1,2, 0, 0, -2, 0,0, 0, 2, -2, 0,0, 2, 0, 0, 0,
0, 1, 0, 0, 1,0, 2, 2, -2, 2,0, -1, 0, 0, 1,-2, 0, 0, 2, 1,
0, -1, 2, -2, 1,2, 0, 0, -2, 1,0, 1, 2, -2, 1,1, 0, 0, -1, 0,
2, 1, 0, -2, 0,0, 0, -2, 2, 1,0, 1, -2, 2, 0,0, 1, 0, 0, 2,
-1, 0, 0, 1, 1,0, 1, 2, -2, 0,0, 0, 2, 0, 2,1, 0, 0, 0, 0,
0, 0, 2, 0, 1,1, 0, 2, 0, 2,1, 0, 0, -2, 0,-1, 0, 2, 0, 2,
0, 0, 0, 2, 0,1, 0, 0, 0, 1,-1, 0, 0, 0, 1,-1, 0, 2, 2, 2,
1, 0, 2, 0, 1,0, 0, 2, 2, 2,2, 0, 0, 0, 0,1, 0, 2, -2, 2,
2, 0, 2, 0, 2,0, 0, 2, 0, 0,-1, 0, 2, 0, 1,-1, 0, 0, 2, 1,
1, 0, 0, -2, 1,-1, 0, 2, 2, 1,1, 1, 0, -2, 0,0, 1, 2, 0, 2,
0, -1, 2, 0, 2,1, 0, 2, 2, 2,1, 0, 0, 2, 0,2, 0, 2, -2, 2,
0, 0, 0, 2, 1,0, 0, 2, 2, 1,1, 0, 2, -2, 1,0, 0, 0, -2, 1,
1, -1, 0, 0, 0,2, 0, 2, 0, 1,0, 1, 0, -2, 0,1, 0, -2, 0, 0,
0, 0, 0, 1, 0,1, 1, 0, 0, 0,1, 0, 2, 0, 0,1, -1, 2, 0, 2,
-1, -1, 2, 2, 2,-2, 0, 0, 0, 1,3, 0, 2, 0, 2,0, -1, 2, 2, 2,
1, 1, 2, 0, 2,-1, 0, 2, -2, 1,2, 0, 0, 0, 1,1, 0, 0, 0, 2,
3, 0, 0, 0, 0,0, 0, 2, 1, 2,-1, 0, 0, 0, 2,1, 0, 0, -4, 0,
-2, 0, 2, 2, 2,-1, 0, 2, 4, 2,2, 0, 0, -4, 0,1, 1, 2, -2, 2,
1, 0, 2, 2, 1,-2, 0, 2, 4, 2,-1, 0, 4, 0, 2,1, -1, 0, -2, 0,
2, 0, 2, -2, 1,2, 0, 2, 2, 2,1, 0, 0, 2, 1,0, 0, 4, -2, 2,
3, 0, 2, -2, 2,1, 0, 2, -2, 0,0, 1, 2, 0, 1,-1, -1, 0, 2, 1,
0, 0, -2, 0, 1,0, 0, 2, -1, 2,0, 1, 0, 2, 0,1, 0, -2, -2, 0,
0, -1, 2, 0, 1,1, 1, 0, -2, 1,1, 0, -2, 2, 0,2, 0, 0, 2, 0,
0, 0, 2, 4, 2,0, 1, 0, 1, 0 );

var ampsecul = new Array (
0  ,-171996 ,-1742 ,92025 ,89,1  ,2062    ,2     ,-895  ,5,
8  ,-13187  ,-16   ,5736  ,-31,9  ,1426    ,-34   ,54    ,-1,
10 ,-517    ,12    ,224   ,-6,11 ,217     ,-5    ,-95   ,3,
12 ,129     ,1     ,-70   ,0,15 ,17      ,-1    ,0     ,0,
17 ,-16     ,1     ,7     ,0,30 ,-2274   ,-2    ,977   ,-5,
31 ,712     ,1     ,-7    ,0,32 ,-386    ,-4    ,200   ,0,
33 ,-301    ,0     ,129   ,-1,37 ,63      ,1     ,-33   ,0,
38 ,-58     ,-1    ,32    ,0,  -1 );

var ampconst = new Array (
0,0,0,0,46,-24,11,0,-3,1,-3,0,-2,1,1,0,0,0,0,0,0,0,0,0,0,0,48,1,-22,0,0,0,
-15,9,0,0,-12,6,-6,3,-5,3,4,-2,4,-2,-4,0,1,0,1,0,-1,0,1,0,1,0,-1,0,0,0,0,0,
0,0,0,0,-158,-1,123,-53,63,-2,0,0,0,0,-59,26,
-51,27,-38,16,29,-1,29,-12,-31,13,26,-1,21,-10,16,-8,
-13,7,-10,5,-7,0,7,-3,-7,3,-8,3,6,0,6,-3,-6,3,-7,3,6,-3,-5,3,5,0,-5,3,-4,0,4,0,
-4,0,-3,0,3,0,-3,1,-3,1,-2,1,-3,1,-3,1,2,-1,-2,1,2,-1,-2,1,2,0,2,-1,1,-1,-1,0,
1,-1,-2,1,-1,0,1,-1,-1,1,-1,1,1,0,1,0,1,-1,-1,0,-1,0,1,0,1,0,-1,0,1,0,1,0,
-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,1,0,-1,0,1,0);

var prec = 0.0;
prec *= 1e4/10;
var T = (mjd - 2451545.0)/36525.;
var T2 = T * T;
var T3 = T2 * T;
var T10 = T/10.0;
for (i = 0; i < 5; ++i){
	var j=0;
	var x = delaunay[i*4]+delaunay[i*4+1]*T+delaunay[i*4+2]*T2+delaunay[i*4+3]*T3;
	x /= 3600.0*360.0;
	x -= Math.floor(x);
	x *= 2.0*Math.PI;
	for (j = 0; j <= 2*4; ++j) delcache[i*9+j] = (j - 4)*x;}
var lastdeps = 0.0;
for (i = isecul = 0; i < 106 ; ++i) {
	var arg = 0.0;
	var ampcos=0.0;
	var j=0;
	if (ampconst[i*2] || ampconst[i*2+1]) {ampcos = ampconst[i*2+1];} 
	else {ampcos = ampsecul[isecul*5+3] + ampsecul[isecul*5+4]*T10;	++isecul;}
	for (j = 0; j < 5; ++j) arg += delcache[j*9+4 + multarg[i*5+j]];
	if (Math.abs(ampcos) >= prec) lastdeps += ampcos * Math.cos(arg);}
lastdeps = (lastdeps/3600.0/1e4)/pir;
return (lastdeps);
}

function galequ(sw,x,y)
{
var gpr = 192.25/pir;	
var gpd = 27.4/pir;	
var an = 33.0/pir;	
var cgpd = Math.cos(gpd);
var sgpd = Math.sin(gpd);
var cy = Math.cos(y);
var sy = Math.sin(y);
var a = x - an;
if (sw == 1) a = x - gpr;
var ca = Math.cos(a);
var sa = Math.sin(a);
var b = sa;
if (sw == 1) b = ca;
var sq = (cy*cgpd*b) + (sy*sgpd);
var q1 = Math.asin(sq);
if (sw == -1){
	var c = cy*ca;
	var d = (sy*cgpd) - (cy*sgpd*sa);
	if (Math.abs(d) < 1e-20) d = 1e-20;
	var p1 = Math.atan(c/d) + gpr;	}
else {
	var c = sy - (sq*sgpd);
	var d = cy*sa*cgpd;
	if (Math.abs(d) < 1e-20) d = 1e-20;
	var p1 = Math.atan (c/d) + an;	}
if (d < 0) p1 += Math.PI;
if (p1 < 0) p1 += 2*Math.PI;
if (p1 > 2*Math.PI) p1 -= 2*Math.PI;
if(sw==1){ll_r1=p1;bb_r1=q1;}
else {al_1950=p1;de_1950=q1;}
return;
}

function prmat(year1,year2)
{
var t=0.0;
var alf=0.0;
var del=0.0;
if(year1==1950) t=jday(year2,3,21)-jday(year1,3,21);
else t=jday(year1,3,21)-jday(year2,3,21);
var time=t/36525.0;
var d0=0.23449210459913079630223597777156799e-7;
var d1=0.11174959386818911539397789815793604e-1;
var d2=0.14651700808223472170092316405645731e-5;
var d3=0.87272054493620787482503185255845250e-7;
var t0=0.20390124985524953491693911357919683e-7;
var t1=0.97171211299597746038990513165103640e-2;
var t2=-0.20692744591763537661702895036771455e-5;
var t3=-0.20266510432407493982047961909412954e-6;
var z0=0.23449210476839938739538526785799463e-7;
var z1=0.11174959402952244765215142272698626e-1;
var z2=0.53094219810269135628994192263211485e-5;
var z3=0.88726588735181133940544905010109307e-7;
var dzeta=d0+time*(d1+time*(d2+time*d3));
var theta=t0+time*(t1+time*(t2+time*t3));
var zet=z0+time*(z1+time*(z2+time*z3));
var c1=Math.cos(dzeta);
var c2=Math.cos(zet);
var c3=Math.cos(theta);
var s1=Math.sin(dzeta);
var s2=Math.sin(zet);
var s3=Math.sin(theta);
var p00=c1*c2*c3-s1*s2;
var p01=-1.*s1*c2*c3-c1*s2;
var p02=-1.*c2*s3;
var p10=c1*s2*c3+s1*c2;
var p11=c1*c2-s1*s2*c3;
var p12=-1.*s2*s3;
var p20=c1*s3;
var p21=-1.*s1*s3;
var p22=c3;

if(year1==1950){alf=al_1950;del=de_1950;}
else {alf=al_r1;del=de_r1;}

var x0=Math.cos(alf)*Math.cos(del);
var x1=Math.sin(alf)*Math.cos(del);
var x2=Math.sin(del);

if(year1!=1950)	{
	c0=p00*x0+p10*x1+p20*x2;
	c1=p01*x0+p11*x1+p21*x2; 
	c2=p02*x0+p12*x1+p22*x2;}
else {
	c0=p00*x0+p01*x1+p02*x2;
	c1=p10*x0+p11*x1+p12*x2; 
	c2=p20*x0+p21*x1+p22*x2;}
var r=Math.atan2(c1,c0);
if(r<0.0)r=r+Math.PI*2.0;
var d=Math.atan2(c2,Math.sqrt(c0*c0+c1*c1));

if(year2==1950){al_1950=r;de_1950=d;}
else {
	if(year2==1875)	{al_1875=r;de_1875=d;}
	else	{al_r2=r;de_r2=d;}
	}
return;
}

function jday(yy,mm,dd)
{
var d1=Math.floor(yy+4800+(mm-14)/12);
d1=Math.floor((1461*d1)/4);
var e=Math.floor(367*(mm-2-(mm-14)/12*12)/12);
var f=Math.floor(3*((yy+4900+(mm-14)/12)/100)/4);
return (Math.floor(dd-32075+d1+e-f-0.5));
}

function ring(ring_x,ring_k)
{
var ring_y;
ring_y = Math.round(ring_x*Math.pow(10.0,ring_k));
ring_y = parseFloat(ring_y/Math.pow(10.0,ring_k));
return (ring_y);
}