CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"originalUrl" text NOT NULL,
	"shortenedUrl" text NOT NULL,
	"accessCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_shortenedUrl_unique" UNIQUE("shortenedUrl")
);
