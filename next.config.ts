import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";


const vanillaExtract = createVanillaExtractPlugin()
const nextConfig: NextConfig = {};

export default vanillaExtract(nextConfig);
