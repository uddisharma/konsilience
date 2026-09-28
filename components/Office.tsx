import { brand, office } from "@/lib/content";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`;

// Google Maps embed, tinted dark to match the site.
export function OfficeMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-line bg-card ${className}`}>
      <iframe
        title={`${brand.name} office map`}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&z=13&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(.92)_contrast(.9)]"
      />
      {/* brand pin overlay */}
      <span className="pointer-events-none absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-primary shadow-[0_0_0_10px_rgba(26,105,253,.25)]">
        <Icon name="pin" className="size-5 text-white" strokeWidth={2} />
      </span>
    </div>
  );
}

// Office details: location, hours and contact, with a directions button.
export function OfficeDetails({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-card ${compact ? "p-7" : "p-8 sm:p-10"}`}>
      <div className="flex flex-col gap-6">
        <span className="flex w-fit items-center gap-2 rounded-full border border-line bg-black px-3 py-1.5 text-xs font-bold tracking-widest uppercase">
          <Icon name="pin" className="size-3.5 text-primary" strokeWidth={2} />
          {office.code} · {office.label}
        </span>
        <div>
          <p className={`${compact ? "subtitle !text-2xl" : "h3"} font-semibold`}>{office.city}</p>
          <p className="fs-para mt-2 font-medium whitespace-pre-line text-white/75">{office.address}</p>
        </div>
        <ul className="flex flex-col gap-3 text-sm text-white/80">
          <li className="flex items-center gap-3"><Icon name="clock" className="size-4 text-primary" /> {office.hours}</li>
          <li><a href={`mailto:${brand.email}`} className="flex items-center gap-3 hover:text-white"><Icon name="mail" className="size-4 text-primary" /> <span className="u-link">{brand.email}</span></a></li>
          <li><a href={`tel:${brand.phone}`} className="flex items-center gap-3 hover:text-white"><Icon name="phone" className="size-4 text-primary" /> <span className="u-link">{brand.phone}</span></a></li>
        </ul>
      </div>
      <div>
        <Button variant="ghost" href={mapsLink} className="!px-6 !py-3">Get Directions</Button>
      </div>
    </div>
  );
}
