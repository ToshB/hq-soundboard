export type TileKind = "sfx" | "custom-sfx" | "music" | "custom-music" | "music-secret";

export type Tile = {
	id: string;
	label: string;
	kind: TileKind;
};

export type Group = {
	label: string;
	minTileWidth: number;
	tiles: Tile[];
};

function sfx(id: string, label: string): Tile {
	return { id, label, kind: "sfx" };
}

function customSfx(id: string, label: string): Tile {
	return { id, label, kind: "custom-sfx" };
}

function music(id: string, label: string): Tile {
	return { id, label, kind: "music" };
}

function customMusic(id: string, label: string): Tile {
	return { id, label, kind: "custom-music" };
}

function musicSecret(id: string, label: string): Tile {
	return { id, label, kind: "music-secret" };
}

const MONSTERS: Group = {
	label: "Monsters",
	minTileWidth: 84,
	tiles: [
		sfx("monster_orc1", "Orc 1"),
		sfx("monster_orc2", "Orc 2"),
		sfx("monster_orc3", "Orc 3"),
		sfx("monster_goblin", "Goblin"),
		sfx("monster_abomination", "Fishman"),
		sfx("monster_skeleton", "Skeleton"),
		sfx("monster_zombie", "Zombie"),
		sfx("monster_mummy", "Mummy"),
		sfx("monster_dread-warrior", "Dread Warrior"),
		sfx("monster_dread-cultist", "Dread Cultist"),
		sfx("monster_gargoyle", "Gargoyle"),
		sfx("monster_ogre", "Ogre"),
		sfx("monster_gremlin", "Gremlin"),
		sfx("monster_giant-wolf", "Wolf"),
		sfx("monster_warbear", "Bear"),
		sfx("monster_yeti", "Yeti"),
		sfx("monster_gorilla", "Ape"),
		sfx("monster_raptor", "Raptor"),
		sfx("monster_blightcrawler", "Crawler"),
		sfx("monster_serpent2", "Serpent"),
		sfx("monster_beast1", "Beast 1"),
		sfx("monster_beast2", "Beast 2"),
		sfx("monster_thing-below", "Beast 3"),
		sfx("monster_serpent1", "Beast 4"),
		sfx("monster_spirit1", "Spirit 1"),
		sfx("monster_spirit2", "Spirit 2"),
		sfx("monster_specter", "Specter"),
		sfx("monster_death-mist", "Death Mist"),
		sfx("monster_skullblight", "Skull Blight"),
		sfx("monster_bloomscion", "Bloom Scion"),
		sfx("monster_centipede1", "Bug 1"),
		sfx("monster_centipede2", "Bug 2"),
		sfx("monster_spider1", "Spider 1"),
		sfx("monster_spider2", "Spider 2"),
		sfx("monster_snake", "Snake"),
		sfx("event_laugh-male", "Laugh Male"),
		sfx("event_laugh-female", "Laugh Female"),
		customSfx("sound_custom1", "Custom 1"),
		customSfx("sound_custom2", "Custom 2"),
		customSfx("sound_custom3", "Custom 3"),
		customSfx("sound_custom4", "Custom 4"),
		customSfx("sound_custom5", "Custom 5"),
	],
};

const DOORS: Group = {
	label: "Doors",
	minTileWidth: 82,
	tiles: [
		sfx("door_normal", "Door"),
		sfx("door_chest", "Chest"),
		sfx("door_secret", "Secret"),
		sfx("trap_trigger", "Trigger"),
		sfx("door_unlock", "Unlock"),
		sfx("door_portcullis", "Gate"),
		sfx("door_metal", "Metal"),
	],
};

const SPELLS: Group = {
	label: "Spells",
	minTileWidth: 80,
	tiles: [
		sfx("spell_cast", "Cast"),
		sfx("spell_buff", "Heal"),
		sfx("spell_debuff", "Zap"),
		sfx("spell_fireball", "Fireball"),
		sfx("spell_air", "Air"),
		sfx("spell_lightning", "Lightning"),
		sfx("spell_wind", "Wind"),
		sfx("spell_earthquake", "Quake"),
		sfx("spell_teleport", "Teleport"),
		sfx("spell_warp", "Warp"),
		sfx("spell_dread", "Dread"),
		sfx("spell_bard", "Bard"),
		sfx("spell_water", "Water"),
		sfx("spell_ice", "Freeze"),
		sfx("spell_firestorm", "Inferno"),
		sfx("spell_shield", "Barrier"),
		sfx("spell_chant2", "Holy"),
		sfx("spell_chant1", "Darkness"),
	],
};

const COMBAT: Group = {
	label: "Combat",
	minTileWidth: 80,
	tiles: [
		sfx("attack_dagger", "Dagger"),
		sfx("attack_sword", "Sword"),
		sfx("attack_blade", "Blade"),
		sfx("attack_axe", "Axe"),
		sfx("attack_staff", "Staff"),
		sfx("attack_blunt", "Club"),
		sfx("attack_shield", "Shield"),
		sfx("attack_whip", "Whip"),
		sfx("attack_crossbow", "Bolt"),
		sfx("attack_bow", "Arrow"),
		sfx("attack_throw", "Throw"),
		sfx("attack_claw", "Claw"),
		sfx("attack_bite", "Bite"),
		sfx("spell_beam", "Beam"),
	],
};

const TRAPS: Group = {
	label: "Traps",
	minTileWidth: 80,
	tiles: [
		sfx("trap_pit", "Pit"),
		sfx("trap_falling-block", "Block"),
		sfx("trap_spear", "Spear"),
		sfx("trap_axe", "Axe"),
		sfx("trap_blade", "Blade"),
		sfx("trap_stalactite", "Stalactite"),
		sfx("trap_fireburst", "Fireburst"),
		sfx("trap_poison-needle", "Dart"),
		sfx("trap_poison-gas", "Gas"),
		sfx("trap_exploding-lock", "Explosive"),
		sfx("trap_boulder", "Boulder"),
		sfx("trap_acid", "Acid"),
		sfx("trap_vine", "Tangle"),
		sfx("trap_emerge", "Emerge"),
	],
};

const EFFECTS: Group = {
	label: "Effects",
	minTileWidth: 80,
	tiles: [
		sfx("event_gold", "Gold"),
		sfx("event_artifact", "Reward"),
		sfx("event_cheer", "Cheer"),
		sfx("event_boo", "Boo"),
		sfx("event_win", "Victory"),
		sfx("event_lose", "Defeat"),
		sfx("event_fire", "Torch"),
		sfx("event_horn", "Horn"),
		sfx("event_howl", "Howl"),
		sfx("monster_roar", "Roar"),
		sfx("event_water", "Stream"),
		sfx("event_gears", "Gears"),
		sfx("event_shatter", "Shatter"),
		sfx("event_foliage", "Foliage"),
	],
};

/** Two-column layout matching the original grid. */
export const SOUND_COLUMNS: Group[][] = [
	[MONSTERS, DOORS],
	[SPELLS, COMBAT, TRAPS, EFFECTS],
];

export const SOUND_GROUPS: Group[] = SOUND_COLUMNS.flat();

const MOOD_AND_AMBIENCE: Group = {
	label: "Mood & Ambience",
	minTileWidth: 76,
	tiles: [
		music("music_battle", "Battle"),
		music("music_boss", "Fight"),
		music("music_dark", "Dark"),
		music("music_crypt", "Crypt"),
		music("music_horror", "Horror"),
		music("music_mystery", "Strange"),
		music("music_cold", "Cold"),
		music("ambient_jungle1", "Jungle 1"),
		music("ambient_jungle2", "Jungle 2"),
		music("ambient_wind", "Wind"),
		music("ambient_storm", "Storm"),
		music("ambient_town", "Town"),
		music("music_trailer1", "Promo 1"),
		music("music_trailer2", "Promo 2"),
		music("music_trailer3", "Promo 3"),
		music("music_trailer4", "Promo 4"),
	],
};

const THEMES: Group = {
	label: "Themes",
	minTileWidth: 76,
	tiles: [
		music("music_combat", "Combat"),
		music("music_heroic", "Heroic"),
		music("music_epic", "Epic"),
		music("music_clash", "Clash"),
		music("music_war", "War"),
		music("music_tribal", "Tribal"),
		music("music_chasm", "Chasm"),
		music("music_drums", "Drums"),
		music("music_elven", "Elven"),
		music("music_eastern", "Eastern"),
		music("music_goblin", "Goblin"),
		music("music_mines", "Mines"),
		music("music_witch", "Witch"),
		music("music_ominous", "Ominous"),
		music("music_unease", "Unease"),
		music("music_eerie", "Eerie"),
		music("music_scary", "Scary"),
		music("music_fear", "Fear"),
		music("music_march", "March"),
		music("music_sneak", "Sneak"),
		customMusic("music_custom1", "MP3 #1"),
		customMusic("music_custom2", "MP3 #2"),
	],
};

const RETRO: Group = {
	label: "Retro",
	minTileWidth: 76,
	tiles: [
		music("music_pc", "PC (SB)"),
		music("music_pc-roland", "PC (ROL)"),
		music("music_nes1", "NES 1"),
		music("music_nes2", "NES 2"),
		music("music_nes3", "NES 3"),
		music("music_amiga1", "Amiga 1"),
		music("music_amiga2", "Amiga 2"),
		music("music_sorasil1", "Sorasil 1"),
		music("music_sorasil2", "Sorasil 2"),
		music("music_sorasil3", "Sorasil 3"),
		musicSecret("music_pc-cover", "Cover"),
		music("music_pc-cover_hidden", "Cover 2"),
	],
};

export const MUSIC_GROUPS: Group[] = [MOOD_AND_AMBIENCE, THEMES, RETRO];

export const ALL_GROUPS: Group[] = [...SOUND_GROUPS, ...MUSIC_GROUPS];

export const TILES_BY_ID: Map<string, Tile> = new Map(
	ALL_GROUPS.flatMap((group) => group.tiles).map((tile) => [tile.id, tile]),
);
