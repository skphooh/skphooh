/**
 * 受賞歴と活動歴。
 *
 * 表示側はこの配列を並べるだけなので、項目の追加・修正は
 * このファイルだけで完結する。新しい実績は配列の先頭ではなく
 * 時系列の正しい位置に挿入すること（SEASON LOG は上から古い順）。
 */

/** 活動の種別。バッジの色分けに使う */
export type RecordKind = "conference" | "hackathon" | "internship";

export const KIND_LABEL: Record<RecordKind, string> = {
    conference: "学会",
    hackathon: "ハッカソン",
    internship: "インターン",
};

export interface Award {
    /** 賞の名前 */
    title: string;
    /** 授与元の大会・研究会 */
    event: string;
    /** YYYY.MM */
    date: string;
}

export interface LogEntry {
    /** 期間。単月なら "2026.03"、期間なら "2026.04 – 05" */
    period: string;
    kind: RecordKind;
    /** 大会・研究会・企業の名前 */
    title: string;
    /** 発表形式や担当業務 */
    detail: string;
    /** この活動で得た賞。あれば行内に併記する */
    award?: string;
    /** 進行中なら true。バッジが明滅する */
    ongoing?: boolean;
}

/** 受賞歴。掲示板に出す */
export const awards: Award[] = [
    {
        title: "東京支部学生奨励賞",
        event: "電子情報通信学会 第31回 東京支部 学生会研究発表会",
        date: "2026.03",
    },
    {
        title: "オーディエンス賞",
        event: "Hack-1グランプリ 2026",
        date: "2026.05",
    },
    {
        title: "セガサミーイノベーション賞",
        event: "Hack-1グランプリ 2026",
        date: "2026.05",
    },
];

/** 活動歴。上から古い順 */
export const seasonLog: LogEntry[] = [
    {
        period: "2026.03",
        kind: "conference",
        title: "電子情報通信学会 第31回 東京支部 学生会研究発表会",
        detail: "口頭発表 / 国内学会 / 査読なし",
        award: "東京支部学生奨励賞",
    },
    {
        period: "2026.04 – 05",
        kind: "hackathon",
        title: "Hack-1グランプリ 2026",
        detail: "1ヶ月でプロダクトを立ち上げ、成果発表を行う",
        award: "オーディエンス賞・セガサミーイノベーション賞 W受賞",
    },
    {
        period: "2026.05",
        kind: "conference",
        title: "電子情報通信学会 LOIS研究会",
        detail: "口頭発表 / 国内学会 / 査読なし",
    },
    {
        period: "2026.08 – 09",
        kind: "internship",
        title: "LINEヤフー株式会社",
        detail: "セキュリティエンジニア / 脆弱性診断",
        ongoing: true,
    },
];
