"use client";

import { Phone, Smartphone, Mail, MapPin, Users } from "lucide-react";
import { useModal } from "@/components/providers/ModalProvider";

export default function ContactSection() {
  const { openModal } = useModal();

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-20 md:py-24 lg:py-28 -scroll-mt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
            Parlons ensemble
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[var(--color-primary)]">
            Contactez-nous
          </h2>
          <p className="mt-4 text-[15px] md:text-base max-w-3xl mx-auto opacity-90 text-[var(--color-text)]">
            Prêt à commencer ? Planifiez une consultation gratuite et obtenez
            une évaluation personnalisée de vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-stretch">
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)]">
              Informations de contact
            </h3>

            <div className="space-y-9">
              <a href="tel:5144943795" className="block">
                <div className="group flex items-center gap-4 p-4 rounded-2xl ring-1 ring-white/10 transition-all hover:-translate-y-0.5 bg-[var(--color-background-light)]">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[var(--color-primary-light)]">
                    <Smartphone className="w-6 h-6 text-[var(--color-background)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text)]">
                      Téléphone
                    </h4>
                    <p className="transition-colors group-hover:text-[var(--color-primary)] opacity-80 text-[var(--color-text)]">
                      (514) 494-3795
                    </p>
                  </div>
                </div>
              </a>

              <a href="mailto:info@tigerbecars.ca" className="block">
                <div className="group flex items-center gap-4 p-4 rounded-2xl ring-1 ring-white/10 transition-all hover:-translate-y-0.5 bg-[var(--color-background-light)]">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[var(--color-primary)]">
                    <Mail className="w-6 h-6 text-[var(--color-background)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text)]">
                      Email
                    </h4>
                    <p className="transition-colors group-hover:text-[var(--color-primary)] opacity-80 text-[var(--color-text)]">
                      info@tigerbecars.ca
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=11770+5e+Avenue+Montreal+QC+H1E+2X4"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="group flex items-center gap-4 p-4 rounded-2xl ring-1 ring-white/10 transition-all hover:-translate-y-0.5 bg-[var(--color-background-light)]">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[var(--color-primary-dark)]">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text)]">
                      Adresse
                    </h4>
                    <p className="transition-colors group-hover:text-[var(--color-primary)] opacity-80 text-[var(--color-text)]">
                      11770 5e Avenue Montréal, QC H1E 2X4
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-3xl p-10 text-center shadow-sm ring-1 ring-white/10 h-full flex flex-col justify-center items-center bg-[var(--color-background-light)]">
              <Users className="w-14 h-14 mx-auto mb-5 opacity-90 text-[var(--color-text)]" />
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-[var(--color-text)]">
                Consultation gratuite
              </h3>
              <p className="text-[15px] md:text-base mb-8 max-w-2xl mx-auto text-[var(--color-text)]">
                Contactez-nous aujourd&apos;hui pour une évaluation
                personnalisée de vos besoins. Notre équipe vous accompagnera
                dans la mise en place des services adaptés.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center">
                <button
                  onClick={() => openModal("consultation")}
                  className="px-6 py-3 rounded-xl font-semibold text-white shadow hover:-translate-y-0.5 transition-transform cursor-pointer bg-[var(--color-primary-dark)]"
                >
                  Demander une consultation
                </button>

                <a
                  href="tel:5144943795"
                  className="px-6 py-3 rounded-xl font-semibold ring-1 ring-white/20 backdrop-blur transition-transform inline-flex items-center justify-center hover:-translate-y-0.5 bg-[var(--color-background-transparent)] text-[var(--color-text)]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Appeler maintenant
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal is provided globally by ModalProvider */}
      </div>
    </section>
  );
}