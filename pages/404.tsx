import logoImage from '../public/logo.png'

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen w-full pb-10 max-">
      <div>
        <div className="flex gap-3 items-center">
          <h1 className="text-md sm:text-2xl">
            ページが見つかりませんでした
          </h1>
          <img src={logoImage.src} width={40} height={40} className="rounded-full" />
        </div>
        <p className="text-md sm:text-lg w-full text-right">ステータスコード: 404</p>
        <div className="mt-14">
          <a className="py-4 text-center block w-full border rounded-md cursor-pointer hover:bg-slate-100" href="/">
            トップに戻る
          </a>
        </div>
      </div>
    </div>
  )
}