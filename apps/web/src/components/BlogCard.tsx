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
  blogId
}) => {
  return (
    <Link href={`/${blogId}`}>
    <Card>
      <CardHeader>
        <div className="relative h-[220px] w-full overflow-hidden rounded-md">
          <Image src={imageUrl} alt="thumbnail" className="object-cover" fill />
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="rounded-sm bg-green-100">
          {category}
        </Badge>
        <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        <p className="text-sm font-light italic">
          {format(createdAt, 'dd MMMM yyyy')} - {author}
        </p>
        <p className="line-clamp-3">{description}</p>
      </CardContent>
    </Card>

    </Link>
  );
};

export default BlogCard;
