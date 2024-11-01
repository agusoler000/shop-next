/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function () {
	const { users, ok } = await getPaginatedUsers()

	if (!ok) redirect('/auth/login');
	return (
		<>
			<Title title='Users' />

			<div className='mb-10'>
			<UsersTable users={users!} />
			</div>
		</>
	);
}
