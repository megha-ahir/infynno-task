interface MatchesData {
    sport_id: number;
    league_id: number;
    season_id: number;
    stage_id: number;
    group_id: null | number;
    aggregate_id: null;
    round_id: number;
    state_id: number;
    venue_id: number;
    name: string;
    starting_at: Date | string;
    result_info: null | string;
    leg: string;
    details: null | string;
    length: number;
    placeholder: boolean;
    has_odds: boolean;
    has_premium_odds: boolean;
    starting_at_timestamp: number;
}

interface IMatchesResponse {
    data: MatchesData[];
    message: string;
}

interface DateLabels {
    dayLabel: string;
    dateLabel: string;
    currentDateISO: Date;
}