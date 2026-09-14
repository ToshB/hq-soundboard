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
	text: "Flammene i Mentors kammer sitter lavt og rødglødende, og skyggene krummer seg over hyller fulle av eldgamle bokruller. Han samler blikket sitt om den unge flokken foran seg og taler med tyngden av mange år. Ordene hans handler om Zargon — en gang hans egen lærling, en gang en lovende sjel, nå kronet med Undergangens gru. Makten fristet Zargon til å stjele hemmeligheter han aldri var rede for, og da sannheten kom for en dag, brøt han med sin mester og alt han hadde lært å ære. Et voldsomt oppgjør fulgte, og selv om Mentor sto igjen med livet, var Zargon uskadd nok til å flykte til de øde vidder i nord. Der har trollmannen siden hamret sammen en hær av mørke, og nå marsjerer den mot Grenselandene på ny. Derfor har Mentor kalt dere hit: for å bli prøvet, herdet, og til slutt sendt ut for å møte fjorten dødelige prøvelser. Bestå dem alle, og tittelen Rikets Suverene Ridder skal være deres for alltid — dersom dere lever for å høre den ropt.",
};

export const QUESTS: Quest[] = [
	{
		number: 1,
		title: "Katakombenes vokter",
		summary:
			"Under den ranke jorden ligger Fellmargs grav, urørt i uminnelige tider — inntil nå. Der nede, i de svarte katakombene, har gargoylen Verag festet sitt fotfeste: en stenlevning med klør skarpe som barberblad og et blikk som lammer selv de modigste sjeler. Dette er den aller første prøven kongen og Mentor byr dere: stig ned i mørket, finn beistet der det lurer blant knokler og støv, og fell det for godt. Ingen kart over de dypeste gangene, ingen snarveier å ty til — bare fakkelen deres og hverandres rygg å stole på. Klarer dere denne prøven sammen, har dere tatt det første, tunge steget mot å bli sanne helter av riket.",
	},
	{
		number: 2,
		title: "Ridderen i lenker",
		summary:
			"Ridder Ragnar var en gang kongens skarpeste sverd, fryktet av fiender og hyllet av venner — inntil han forsvant sporløst på grensevakt. Nå hvisker rapportene at han råtner i lenker dypt inne i orkhøvdingen Ulags festning, holdt som et trofé for å knekke kongens vilje. Deres oppdrag er klart: finn cellen hans før motet svikter ham for godt, kutt lenkene, og før ham hele veien tilbake til trappen og dagslyset. Men vær på vakt — i det øyeblikket han finnes, våkner hele festningen, og dører som før var stengt står nå vidåpne for enhver av Ulags krigere. Bringer dere ridderen hjem i live, venter en fyrstelig belønning på 240 gullstykker. Faller han for et sverd på veien ut, er all ære og lønn tapt i samme stund.",
	},
	{
		number: 3,
		title: "Krigsherrens hule",
		summary:
			"Ulag slapp unna sist gang blod og flammer drev orkene fra deres forrige tilholdssted, og prins Magnus har ingen tenkt å la krigsherren glemme sine synder. Nå er ordren ubøyelig: spor opp Ulag i hans eget, dypeste tilhold, og sørg for at han aldri mer får true riket eller lenke en fanget ridder. Hulen hans er et virvar av korridorer fylt med hans mest lojale og mest brutale krigere, og et sted i mørket venter høvdingen selv, tungt bevæpnet og uten nåde å gi. Lykkes dere med å felle ham, venter 180 gullstykker delt mellom dere som kongens takk — og alt gods dere selv finner i skattkammeret hans, får dere beholde uten å dele et øre.",
	},
	{
		number: 4,
		title: "Prinsens gull",
		summary:
			"Tre forseglede kister, merket med prinsens eget segl og lastet med gull bestemt for kongens skattkammer, ble kapret midt på kongeveien før vaktene engang rakk å dra sverd. Sporet leder til Mørkefjellene, der en flokk orker under Gulthor — en kriger som har sverget sin sjel til Undergangens mørke makter — nå gjemmer byttet bak steinvegger og skarpe klinger. Deres oppgave er å finne alle tre kistene og bære dem, én om gangen, hele veien tilbake til sivilisasjonen, uansett hvor tungt lasset gjør både steg og flukt. Fullfører dere oppdraget, venter en romslig belønning på 240 gullstykker fra en takknemlig prins — men gullet i kistene selv tilhører kronen, ikke helteflokken som bar det hjem.",
	},
];
