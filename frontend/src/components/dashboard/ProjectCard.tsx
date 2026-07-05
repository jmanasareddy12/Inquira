type Props = {
    title: string;
    description: string;
};

export default function ProjectCard({
    title,
    description
}: Props) {

    return (

        <div className="border rounded-xl p-6 shadow">

            <h2 className="text-xl font-bold">
                {title}
            </h2>

            <p className="mt-3 text-gray-600">
                {description}
            </p>

        </div>

    );

}