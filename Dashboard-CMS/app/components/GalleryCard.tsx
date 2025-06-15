"use client";
import Image from "next/image";
import { useProperties } from "../context/PropertiesContext";
import { useMutation } from "@apollo/client";
import { PUBLISH_PAGE, GET_GALLERY } from "../lib/queries";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  imageurl?: string;
  date_publication?: string;
  lien_de_page?: string;
  isactive: boolean;
}

export default function GalleryCard({
  id,
  title,
  imageurl,
  date_publication,
  lien_de_page,
  isactive,
}: Props) {
  const { config } = useProperties();

  const [publishPage, { loading: publishLoading }] = useMutation(PUBLISH_PAGE, {
    variables: { id },
    refetchQueries: [{ query: GET_GALLERY }],
  });

  return (
    <Link href={`/page/${lien_de_page}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
        {config.imageurl && imageurl && (
          <div className="w-full h-32 mb-3 overflow-hidden rounded">
            <Image
              src={imageurl}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        <h3 className="font-semibold text-lg truncate mb-1">{title}</h3>
        {config.date_publication && date_publication && (
          <p className="text-xs text-gray-500 mb-2">
            Published: {new Date(date_publication).toLocaleDateString()}
          </p>
        )}
        {config.lien_de_page && lien_de_page && (
          <p className="text-xs text-gray-400 mb-2">Slug: {lien_de_page}</p>
        )}

        <button
          onClick={() => publishPage()}
          disabled={isactive || publishLoading}
          className={`mt-auto px-3 py-1 text-xs rounded ${
            isactive
              ? "bg-green-200 text-green-800 cursor-default"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isactive ? "Published" : publishLoading ? "Publishing…" : "Publish"}
        </button>
      </div>
    </Link>
  );
}
