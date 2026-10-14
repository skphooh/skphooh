import { ImageResponse } from "next/og";

/**
 * SNS やチャットに貼ったときのカード画像。
 *
 * ビルド時に 1 枚だけ書き出される。Satori は外部 CSS を読まないので
 * 配色はここに直接書く（globals.css の pool 系と同じ値）。
 * 既定のフォントに和文グリフが無いため、文字は欧文だけにしている。
 */

export const alt = "skphooh — Security / Web Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background:
                        "linear-gradient(160deg, #01223e 0%, #013a63 55%, #0077b6 100%)",
                    color: "#f4f8fa",
                    position: "relative",
                }}
            >
                {/* レーンライン */}
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 150 + i * 130,
                            width: "100%",
                            height: 2,
                            background: "rgba(244, 248, 250, 0.14)",
                        }}
                    />
                ))}

                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: "#e63946",
                        }}
                    />
                    <div
                        style={{
                            fontSize: 24,
                            letterSpacing: 8,
                            color: "#8fd3e8",
                        }}
                    >
                        50m POOL / PORTFOLIO
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 148,
                            fontWeight: 700,
                            letterSpacing: -4,
                            lineHeight: 1,
                        }}
                    >
                        skphooh
                    </div>
                    <div
                        style={{
                            marginTop: 28,
                            fontSize: 34,
                            letterSpacing: 6,
                            color: "#00b4d8",
                        }}
                    >
                        SECURITY / WEB ENGINEERING
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 22,
                        letterSpacing: 4,
                        color: "rgba(244, 248, 250, 0.6)",
                    }}
                >
                    <div style={{ display: "flex" }}>PRODUCTS / RECORDS / ABOUT</div>
                    <div style={{ display: "flex" }}>skphooh.com</div>
                </div>
            </div>
        ),
        size,
    );
}
