import { QUEST_INTRO, QUESTS } from "@/lib/quests";

export function QuestsPanel() {
	return (
		<div className="max-w-[640px] mx-auto pb-2 pt-3">
			<div className="quest-card quest-intro">
				<div className="quest-title">{QUEST_INTRO.title}</div>
				<p className="quest-summary">{QUEST_INTRO.text}</p>
			</div>

			{QUESTS.map((quest) => (
				<div key={quest.number} className="quest-card">
					<div className="quest-number">Quest {quest.number}</div>
					<div className="quest-title">{quest.title}</div>
					<p className="quest-summary">{quest.summary}</p>
				</div>
			))}
		</div>
	);
}
