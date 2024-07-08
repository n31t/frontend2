
import Link from "next/link"
import { Button } from "./ui/button"
import { JSX, SVGProps } from "react"
import { InfoComponent } from "./info-component"

export function HomeComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7024] to-[#FFD9C7] text-[#FFFFFF]">

      <main>
      <section className="w-full h-[80dvh] relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F18F65]/80 to-[#FFD9C7]/60 z-10" />
          <video src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/videos/16944946-uhd_3840_2160_60fps-2+-+COMPRESS.mp4" autoPlay loop muted className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 md:px-6">
            <div className="max-w-2xl space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Найди квартиру своей мечты в 2 клика
              </h1>
              <p className="text-lg text-white/80 md:text-xl">
              Наш сайт предлагает уникальный опыт поиска жилья в Алматы благодаря интеграции искусственного интеллекта, который анализирует предложения с нескольких популярных сайтов.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                  Начать сейчас
                </Link>
                <Link
                  href="#learnmore"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Узнать больше
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="container mx-auto py-24 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl font-bold">Discover your perfect rental with Jili Yui</h1>
            <p className="text-lg text-[#808080]">
              Our AI-powered platform connects you with the ideal rental property, tailored to your needs.
            </p>
            <Button>Explore Rentals</Button>
          </div>
          <img src="/placeholder.svg" width={600} height={400} alt="Hero Image" className="rounded-xl shadow-lg" />
        </section> */}
        <section className="container mx-auto py-24 px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <MergeIcon className="h-12 w-12" />
            <h3 className="text-2xl font-bold">Умный поиск</h3>
            <p className="text-[#E8E8E8]">
            Наш ИИ анализирует множество факторов и предлагает наилучшие варианты, соответствующие вашим запросам.
            </p>
          </div>
          <div className="space-y-4" id="learnmore">
            <SignalMediumIcon className="h-12 w-12" />
            <h3 className="text-2xl font-bold">Авто коммуникация</h3>
            <p className="text-[#E8E8E8]">
            Наш сайт прост в использовании, что делает процесс поиска квартиры быстрым и приятным. Также большая часть процесса автоматизирована. 
            </p>
          </div>
          <div className="space-y-4">
            <ShoppingCartIcon className="h-12 w-12" />
            <h3 className="text-2xl font-bold">Обширная База Данных</h3>
            <p className="text-[#E8E8E8]">
            Мы собираем информацию с множества популярных сайтов недвижимости ежедневно, обеспечивая вам доступ к самым актуальным предложениям.
            </p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-12 mx-auto mb-10">
        <div className="space-y-4">
          <img
            src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/warmhome.png"
            width={180}
            height={90}
            alt="homespark logo"
            className="mx-auto aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
          />
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Доверенные компании, откуда мы берем информацию о квартирах.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 items-center justify-center gap-6 md:grid-cols-3 lg:gap-12">
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://krisha.kz/static/frontend/images/landing/mobile/krisha-logo.png"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://habrastorage.org/getpro/moikrug/uploads/company/100/007/101/9/logo/medium_a5416a751f7e73c461761b458b50c5d0.jpg"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://www.kn.kz/favicon/android-chrome-256x256.png"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://nedvizhka.kz/static/interface/logo_ned.svg"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdF6IDT4UFuXAFD4IF-iVJCRGk7hRnxvdP5Q&s"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65e2d2f2ad51546e2aa11191_65e2da3b25136a1f45a25642/scale_1200"
              width={140}
              height={70}
              alt="Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
        <section className="container mx-auto pb-16 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="p-4 max-w-xl mx-auto dark:bg-gray-800">
    <h2 className=" mb-8 text-3xl font-bold lg:text-4xl">Как это работает?
    </h2>

    <div className="flex">
        <div className="mr-4 flex flex-col items-center">
            <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="h-6 w-6 text-blue-800 dark:text-slate-200">
                        <path d="M12 5l0 14"></path>
                        <path d="M18 13l-6 6"></path>
                        <path d="M6 13l6 6"></path>
                    </svg></div>
                    </div>
                    <div className="h-full w-px bg-[#FFFFFF]"></div>
                </div>
                <div className="pt-1 pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">Ввод запроса</p>
                    <p className="text-gray-600 dark:text-slate-400">На главной странице введите свой запрос нужной квартиры и соответствующие фильтры для получения лучшего результата.</p>
                </div>
            </div>


            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="h-6 w-6 text-blue-800 dark:text-slate-200">
                                <path d="M12 5l0 14"></path>
                                <path d="M18 13l-6 6"></path>
                                <path d="M6 13l6 6"></path>
                            </svg></div>
                    </div>
                    <div className="h-full w-px bg-[#FFFFFF] "></div>
                </div>
                <div className="pt-1 pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">Поиск квартиры</p>
                    <p className="text-gray-600 dark:text-slate-400">После ввода нажмите на кнопку поиска. Вам будет предоставлен определенный ряд квартир и если не нашли нужную, то стоит немного поменять ваш запрос на более точный.</p>
                </div>
            </div>


            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="h-6 w-6 text-blue-800 dark:text-slate-200">
                                <path d="M12 5l0 14"></path>
                                <path d="M18 13l-6 6"></path>
                                <path d="M6 13l6 6"></path>
                            </svg></div>
                    </div>
                    <div className="h-full w-px bg-[#FFFFFF]"></div>
                </div>
                <div className="pt-1 pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-900 ">Контакт с владельцем</p>
                    <p className="text-gray-600 dark:text-slate-400">Наш сайт предоставляет автоматизированный способ контактирования с владельцем, но также и присутствует сотовый телефон продавца если же вы хотите сделать это сами.</p>
                </div>
            </div>


            <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-[999px] border-2 border-blue-900 bg-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="h-6 w-6 text-white dark:text-slate-200">
                                <path d="M5 12l5 5l10 -10"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="pt-1 ">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">Поздравляю!</p>
                    <p className="text-gray-600 dark:text-slate-400">Вы успешно записались на осмотр квартиры</p>
                </div>
            </div>


            </div>
          {/* <InfoComponent/> */}
          {/* <img src="/placeholder.svg" width={600} height={400} alt="Feature Image" className="rounded-xl shadow-lg" />
          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-bold">Поиск квартиры - просто и быстро.</h2>
            <p className="text-lg text-[#ffffff]">
              С помощью Home Spark вы можете легко и быстро найти жилье, которое подходит именно вам. ИИ способен принимать <span className="text-[#ff851a]">любые запросы</span>, вот пример самых популярных:
            </p>
            <ul className="list-disc list-inside text-base text-[#ffffff] space-y-2">
              <li>Квартиры для студентов</li>
              <li>Выгодная квартира в Алмалинском районе.</li>
              <li>Семейные квартиры с детскими площадками.</li>
              <li>Квартиры с современным ремонтом в центре города.</li>
            </ul>
            <p className=" text-lg text-[#ffffff]">
              Запросы могут быть, как и простые, так и сложные. Наш ИИ справится с любым запросом.
            </p>
            <p className=" text-lg text-[#ffffff]">
              После запроса, вы получите список квартир, которые соответствуют вашим требованиям. Вы сможете просмотреть фотографии, описание и цены на квартиры. Определившись с выбором, 
              вы сможете использовать нашу функцию <span className="text-[#ff851a]">автоматического общения с арендодателем</span>. Он сможет ответить на ваши вопросы и договориться о встрече и в последствии отправить вам дату, когда вам нужно будет лично просмотреть квартиру. Номер владельца также будет доступен вам, если вы лично хотите договориться.            </p>
            <p className="text-lg text-[#ffffff]">
              Не теряйте времени на бесконечные поиски! Доверьтесь <span className="text-[#ff851a]">homespark</span> и найдите свою идеальную квартиру уже сегодня. С нами поиск жилья становится простым и удобным.
            </p>
            <Link href="/">
              <Button className="my-4">Попробовать</Button>
            </Link>


          </div> */}
        </section>
      </main>
      {/* <footer className="bg-[#4A00E0] py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <JapaneseYenIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Jili Yui</span>
          </div>
          <nav className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer> */}
    </div>
  )
}


function MergeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  )
}


function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function SignalMediumIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
    </svg>
  )
}
