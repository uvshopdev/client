import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";


const vanillaExtract = createVanillaExtractPlugin()
const nextConfig: NextConfig = {
    output: "export",
    basePath: process.env.PAGES_BASE_PATH,
};

export default vanillaExtract(nextConfig);
