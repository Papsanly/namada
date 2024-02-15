export default function Home() {
  return (
    <main className={'flex flex-col bg-card w-[600px] rounded-sm p-4'}>
      <div className={'flex flex-row justify-between'}>
        <h1>Total Balance</h1>
        <div className={'flex flex-row justify-end'}>
          <p className={'text-6xl font-bold'}>$10.00</p>
        </div>
      </div>
    </main>
  )
}
