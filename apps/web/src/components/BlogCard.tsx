import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface BlogCardProps {
  title: string;
  description: string;
  category: string;
  author: string;
  imageUrl: string;
  createdAt: Date;
  blogId: number;
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  description,
  category,
  author,
  imageUrl,
  createdAt,
  blogId,
}) => {
  return (
    <Link href={`/${blogId}`}>
      <Card className="group overflow-hidden rounded-md">
        <CardHeader className="p-0">
          <div className="relative h-[220px] w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt="thumbnail"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              layout="fill"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <Badge
            variant="outline"
            className="rounded-sm bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 text-xs font-semibold uppercase"
          >
            {category}
          </Badge>
          <h2 className="line-clamp-2 text-lg font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-sm font-light italic text-gray-600">
            {format(createdAt, 'dd MMMM yyyy')} - {author}
          </p>
          <p className="line-clamp-3 text-gray-700">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
