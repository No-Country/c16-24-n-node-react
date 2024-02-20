import aboutImg from '../../assets/about.jpg'

function About() {
  return (
    <main className="flex flex-row justify-center px-4 mt-5">
      <section className="max-w-[1000px]">
        <h2 className="text-[45px] mb-4 bold">About Chetifabene</h2>
        <img src={aboutImg} />
        <h3 className='text-[30px] bold mb-4'> Overview</h3>
        <p className='text-xl mb-3 text-justify'>
          Chetifabenet website and application. To un-limit and expand the
          experience of talented food & drink lovers from everywhere. FoodyCraft
          platform is featured with many loaded functions to enjoy trading
          posts, and importantly to talk food across all continents. From the
          European headquarter in Dublin, our team is crafting lots of
          tremendous work every day, to have a great food experience.
        </p>
        <p className='text-xl mb-3 text-justify'>
          We are around seven billion people living on earth. Our Mother Nature
          continued to enrich us with secrets. Secrets of food, to enjoy every
          new day a delicious experience. It is an excitement to connect people
          together. Chetifabenet is here to open all doors of inspiration, to
          taste our world differently, discover new kitchens every day, and
          express feelings about our global mutual language, food.
        </p>
      </section>
    </main>
  );
}

export default About;
