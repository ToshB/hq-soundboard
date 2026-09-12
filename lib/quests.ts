export type Quest = {
	number: number;
	title: string;
	summary: string;
};

/**
 * Norwegian, original wording — a GM quick-reference retelling of each quest's
 * premise and objective, not a translation of the Quest Book's own text.
 */
export const QUEST_INTRO = {
	title: "Mentors fortelling",
	text: "For lenge siden var trollmannen Zargon Mentors egen læregutt, men grådigheten etter makt fikk ham til å bryte alle løfter og søke Undergangens mørke krefter. Etter et bittert oppgjør flyktet Zargon nordover, til de øde vidder, for å samle nye og fryktelige krefter. Nå rykker Zargons hærskarer fram mot Grenselandene på ny, og Mentor kaller sammen en ny generasjon helter til å møte dem. Fjorten prøvelser venter dere. Bestå dem, og dere skal hylles som Rikets Suverene Riddere.",
};

export const QUESTS: Quest[] = [
	{
		number: 1,
		title: "Katakombenes vokter",
		summary:
			"Dypt under jorden ligger Fellmargs grav, og i mørket der nede holder gargoylen Verag evig vakt. Dette er heltenes aller første prøvelse: finn veien gjennom katakombene, spor opp uhyret, og legg det for evig til ro. Ingen snarveier, ingen skjulte utveier — bare samhold og stål avgjør om dere består.",
	},
	{
		number: 2,
		title: "Ridderen i lenker",
		summary:
			"Ridder Ragnar, en av kongens fremste sverd, er falt i fangenskap hos orkhøvdingen Ulag. Et fangehull venter et sted i mørket der nede — finn det, bryt lenkene, og før ridderen levende tilbake til trappen før orkflokken slår full alarm. Faller han i kamp på veien ut, er all ære og lønn tapt for godt.",
	},
];
