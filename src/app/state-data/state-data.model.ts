export interface States_daily {
	an: string;
	ap: string;
	ar: string;
	as: string;
	br: string;
	ch: string;
	ct: string;
	date: string;
	dd: string;
	dl: string;
	dn: string;
	ga: string;
	gj: string;
	hp: string;
	hr: string;
	jh: string;
	jk: string;
	ka: string;
	kl: string;
	la: string;
	ld: string;
	mh: string;
	ml: string;
	mn: string;
	mp: string;
	mz: string;
	nl: string;
	or: string;
	pb: string;
	py: string;
	rj: string;
	sk: string;
	status: string;
	tg: string;
	tn: string;
	tr: string;
	tt: string;
	un: string;
	up: string;
	ut: string;
	wb: string;
}

export interface StateDataArray {
	states_daily: States_daily[];
}
export class StateData{
	constructor(public stateName:String, public confirmed: string,public recovered: string,public deceased: string){}
}
export class ChartData{
	constructor(public date:string[], public total: number[],public recovered: number[],public deceased: number[]){}
}
  
