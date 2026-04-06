"use client";
import { useQuery } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import { Suspense } from "react";
import MapLib from "react-map-gl/maplibre";

import { getUserCountries } from "@/lib/countries";
import { Content, MapContent } from "./styles.css";

const page = () => {
	const t = useExtracted("profile");
	const { data, isSuccess } = useQuery({
		queryKey: ["countries"],
		queryFn: () => getUserCountries(),
		staleTime: 60000 * 3,
	});

	return (
		<Content>
			<span>{t("Open countries map")}</span>
			<MapContent>
				<Suspense>
					{isSuccess && (
						<MapLib
							mapStyle={data}
							attributionControl={false}
							zoom={2}
							initialViewState={{
								longitude: 31,
								latitude: 48,
								zoom: 1.2,
							}}
							dragRotate={false}
							scrollZoom={false}
							boxZoom={false}
							doubleClickZoom={false}
							touchZoomRotate={false}
							keyboard={false}
							style={{ width: "100%", height: "100%" }}
						/>
					)}
				</Suspense>
			</MapContent>
		</Content>
	);
};

export default page;
