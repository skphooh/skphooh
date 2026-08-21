import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LaneRope from "@/components/pool/LaneRope";

export const metadata = {
    title: "DQ — False Start | skphooh",
};

/**
 * 404。
 *
 * 号砲より先に飛び出したらフライングで失格になる。存在しない
 * URL に来てしまった状態を、その掲示に見立てている。
 */
export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-24">
            <div className="w-full max-w-lg">
                {/* 掲示板 */}
                <div className="led-board">
                    <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-3">
                        <span className="led-text text-[0.7rem] tracking-[0.25em]">
                            RESULT
                        </span>
                        <span className="led-text led-text-dim text-[0.7rem] tracking-[0.25em]">
                            404
                        </span>
                    </div>

                    <div className="relative z-10 px-6 py-12 text-center">
                        <p
                            className="font-display text-6xl leading-none text-rope-red sm:text-8xl"
                            style={{ textShadow: "0 0 18px rgba(230,57,70,0.55)" }}
                        >
                            DQ
                        </p>
                        <p className="led-text mt-5 text-sm tracking-[0.22em]">
                            FALSE START
                        </p>
                        <p className="led-text led-text-dim mt-6 text-xs leading-relaxed">
                            このレーンには誰もいません。
                            <br />
                            スタート地点からやり直してください。
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <LaneRope />
                </div>

                <div className="mt-8 flex justify-center">
                    <Link href="/" className="btn">
                        <ArrowLeft className="h-4 w-4" />
                        スタート地点へ戻る
                    </Link>
                </div>
            </div>
        </main>
    );
}
