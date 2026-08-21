export type ProjectStatus = "live" | "development" | "archived";

export interface ProjectType {
    title: string;
    description: string;
    features?: string[];
    image?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    status?: ProjectStatus;
    iframePreview?: boolean;
    details?: string;
}

/** プロダクト。上から見せたい順に並べる */
export const projects: ProjectType[] = [
    {
        title: "うちの子製作所",
        description:
            "写真・イラスト1枚からAIが高品質な3Dモデルを生成し、\n3Dプリンター用STLデータを即時出力するクリエイティブプラットフォーム。",
        features: [
            "AI 3D Generation (Tripo3D)",
            "ターンアラウンド生成 (Gemini API)",
            "ブラウザ内 3D Viewer (Three.js)",
            "Print-Ready STL エクスポート",
            "マーケットプレイス",
            "Stripe 決済",
        ],
        techStack: [
            "React",
            "Vite",
            "TypeScript",
            "FastAPI",
            "Firebase",
            "Three.js",
            "Stripe",
            "Gemini API",
        ],
        liveUrl: "https://utinoko.skphooh.com",
        githubUrl: "https://github.com/skphooh/Hack-1",
        status: "live",
        iframePreview: true,
        details:
            "「うちの子製作所」は、好きなキャラクターや思い出の写真・イラスト1枚から、AIが3Dモデルを自動生成するサービスです。\nTripo3D APIで高品質なGLBを生成し、Gemini APIで裏面補完、trimeshでSTL変換・台座追加まで全自動。\n🎖 Hack-1グランプリ2026 オーディエンス賞・セガサミーイノベーション賞 W受賞",
    },
    {
        title: "Wear-Cast",
        description:
            "日々のコーディネートと天気を記録し、他のユーザーの投稿と交流できるSNS型ライフスタイルアプリ。\n天気に基づいたおすすめの服装提案機能も搭載。",
        features: [
            "コーディネート記録",
            "ソーシャルフィード",
            "天気連動レコメンド",
            "プロフィール管理",
        ],
        techStack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
        liveUrl: "https://wearcast.skphooh.com/",
        status: "live",
        iframePreview: true,
        details:
            "Wear-Castは、毎日の気象データと連動してユーザーの服装記録をサポートするSNSアプリケーションです。\n洗練されたUIとスムーズなトランジションで、ストレスのない記録体験を提供します。",
    },
    {
        title: "Meguri24",
        description:
            "AIが24時間の生活リズムを分析し、最適な行動パターンを提案する生活習慣改善アプリ。\n円形の24時間時計UIでタスク管理、睡眠分析、日記機能を提供。",
        features: ["24時間時計UI", "AI生活リズム分析", "タスク管理", "日記・ふりかえり"],
        techStack: ["Next.js", "Clerk", "Neon", "Tailwind CSS", "AI"],
        liveUrl: "https://meguri24.skphooh.com/",
        status: "live",
        iframePreview: true,
        details:
            "Meguri24は、独自の円形UIを採用した新しい形のタスク・生活管理アプリです。\nAIを活用し、日々の記録からより良い習慣形成をサポートします。\nClerkによる安全な認証基盤を備えています。",
    },
    {
        title: "skphooh.com",
        description:
            "このポートフォリオサイト自体。\n50mプールをページ構造に見立て、水・レーン・飛び込みで体験を組み立てている。",
        features: [
            "WebGL コースティクス",
            "レーン構造のプロダクト一覧",
            "飛び込みトランジション",
            "レスポンシブ対応",
        ],
        techStack: ["Next.js", "WebGL", "Framer Motion", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://skphooh.com/",
        githubUrl: "https://github.com/skphooh/skphooh",
        status: "live",
        iframePreview: true,
    },
];
