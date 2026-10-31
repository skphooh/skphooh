/**
 * 受賞歴と活動歴。
 *
 * 表示側はこの配列を並べるだけなので、項目の追加・修正は
 * このファイルだけで完結する。新しい実績は配列の先頭ではなく
 * 時系列の正しい位置に挿入すること（SEASON LOG は上から古い順）。
 */

/** 活動の種別。バッジの色分けに使う */
export type RecordKind = "conference" | "hackathon" | "internship" | "ctf" | "athletics";

export const KIND_LABEL: Record<RecordKind, string> = {
    conference: "学会",
    hackathon: "ハッカソン",
    internship: "インターン",
    ctf: "CTF",
    athletics: "体育会",
};

export interface Award {
    /** 賞の名前 */
    title: string;
    /** 授与元の大会・研究会 */
    event: string;
    /** YYYY.MM */
    date: string;
    /** 受賞を報じた記事。あれば賞の名前がリンクになる */
    url?: string;
}

/** 外部の裏付け。予稿・受賞記事など */
export interface RecordLink {
    label: string;
    url: string;
}

export interface LogEntry {
    /** 期間。単月なら "2026.03"、期間なら "2026.04 – 05" */
    period: string;
    kind: RecordKind;
    /** 大会・研究会・企業の名前 */
    title: string;
    /** 発表形式や担当業務。未確定なら空文字にすると行ごと出ない */
    detail: string;
    /** この活動で得た賞。あれば行内に併記する */
    award?: string;
    /** 賞以外の目に見える成果（記事掲載など）。行内に併記する */
    output?: string;
    /** 取得したオープンバッジの画像。public/ からのパス */
    badge?: { src: string; alt: string };
    /** 予稿や受賞記事へのリンク */
    links?: RecordLink[];
    /** 進行中なら true。バッジが明滅する */
    ongoing?: boolean;
    /** まだ始まっていない予定なら true。終わった実績と区別して表示する */
    upcoming?: boolean;
}

/** 受賞歴。掲示板に出す */
export const awards: Award[] = [
    {
        title: "東京支部学生奨励賞",
        event: "電子情報通信学会 第31回 東京支部 学生会研究発表会",
        date: "2026.03",
        url: "https://informatics.tcu.ac.jp/news/award/?&p=1023",
    },
    {
        title: "オーディエンス賞",
        event: "Hack-1グランプリ 2026",
        date: "2026.05",
        url: "https://www.tcu.ac.jp/news/all/20260527-71348/",
    },
    {
        title: "セガサミーイノベーション賞",
        event: "Hack-1グランプリ 2026",
        date: "2026.05",
        url: "https://www.tcu.ac.jp/news/all/20260527-71348/",
    },
];

/** 活動歴。上から古い順 */
export const seasonLog: LogEntry[] = [
    {
        period: "2024.08",
        kind: "internship",
        title: "ニフティ株式会社",
        detail: "バックエンド / Webサービスの障害の原因究明と再発防止策の立案",
    },
    {
        period: "2026.03",
        kind: "conference",
        title: "電子情報通信学会 第31回 東京支部 学生会研究発表会",
        detail: "口頭発表 / 国内学会 / 査読なし",
        award: "東京支部学生奨励賞",
        links: [
            { label: "予稿 (PDF)", url: "https://www.ieice.org/tokyo/gakusei/activity/kenkyuu-happyoukai/happyou-ronbun/31/pdf/112.pdf" },
            { label: "受賞記事", url: "https://informatics.tcu.ac.jp/news/award/?&p=1023" },
        ],
    },
    {
        period: "2026.04 – 05",
        kind: "hackathon",
        title: "Hack-1グランプリ 2026",
        detail: "1ヶ月でプロダクトを立ち上げ、成果発表を行う",
        award: "オーディエンス賞・セガサミーイノベーション賞 W受賞",
        links: [{ label: "受賞記事", url: "https://www.tcu.ac.jp/news/all/20260527-71348/" }],
    },
    {
        period: "2026.05",
        kind: "conference",
        title: "電子情報通信学会 LOIS研究会",
        detail: "口頭発表 / 国内学会 / 査読なし",
        links: [
            {
                label: "発表概要",
                url: "https://www.ieice.org/publications/ken/summary.php?contribution_id=143404&society_cd=ISS&ken_id=IE&year=2026&presen_date=2026-05-07&schedule_id=8977&lang=jp&expandable=3",
            },
        ],
    },
    {
        period: "2026.06",
        kind: "ctf",
        title: "SECCON Beginners CTF 2026",
        detail: "Web 分野の問題に取り組む",
    },
    {
        period: "2026.08 – 09",
        kind: "internship",
        title: "LINEヤフー株式会社",
        detail: "セキュリティエンジニア / ホワイトボックス型の脆弱性診断（約6週間）",
        output: "LINEヤフー Tech Blog にインターンレポート掲載「Security by DesignでAI生成Webアプリを検証する」",
        links: [{ label: "インターンレポート", url: "https://techblog.lycorp.co.jp/ja/20261027b" }],
    },
    {
        period: "2026.08 – 09",
        kind: "internship",
        title: "株式会社野村総合研究所",
        detail: "セキュリティスペシャリスト / MSS・SOC の業務に参加",
    },
    {
        period: "2026.09",
        kind: "internship",
        title: "デロイト トーマツ サイバー合同会社",
        detail: "SOC（セキュリティオペレーションセンター）",
    },
    {
        period: "2026.08 – 09",
        kind: "internship",
        title: "株式会社三菱UFJ銀行",
        detail: "サイバーセキュリティ",
    },
    {
        period: "2026.10",
        kind: "internship",
        title: "富士通株式会社",
        detail: "インフラエンジニア / ゼロトラスト・SASE",
        output: "オープンバッジ「Fujitsu Internship 2026」を取得",
        badge: { src: "/badges/fujitsu-internship-2026.png", alt: "Fujitsu Internship 2026 オープンバッジ" },
    },
    {
        period: "2026.11",
        kind: "conference",
        title: "電子情報通信学会 LOIS研究会",
        detail: "口頭発表「Wi-Fiフィンガープリントに用いる位置測定手法の検討」/ 国内学会 / 査読なし",
        upcoming: true,
        links: [
            {
                label: "プログラム",
                url: "https://ken.ieice.org/ken/program/index.php?mode=program&tgs_regid=1e1c08fd856ca645fb80a134caca05df86a8dd8ae2d00a62f27db18e6ab43ea7&tgid=LOIS&layout=html2&lang=jpn",
            },
        ],
    },
];
