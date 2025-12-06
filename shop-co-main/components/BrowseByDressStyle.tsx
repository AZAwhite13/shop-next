import Image from "next/image";

export default function DressStyleGrid() {
  const items = [
    { label: "Casual", img: "https://i.ibb.co/trQVqWh/casual.jpg" },
    { label: "Formal", img: "https://i.ibb.co/HfKFgn6C/formal.jpg" },
    { label: "Party", img: "https://i.ibb.co/jPHN894y/party.jpg" },
    { label: "Gym", img: "https://i.ibb.co/BV22Vnj4/gym.jpg" },
  ];

  return (
    <div className="w-full flex justify-center py-10 bg-gray-100 rounded-3xl">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition p-4 flex items-center"
            >
              <span className="absolute top-4 left-4 text-xl font-semibold z-10">
                {item.label}
              </span>

              <Image
                src={item.img}
                alt={item.label}
                width={600}
                height={400}
                unoptimized
                className="object-cover w-full h-56 sm:h-64 md:h-72 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
