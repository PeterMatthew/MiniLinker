import Knex from 'knex';

interface ITransaction {
  name: string;
  description: string;
  date: string;
  value: number;
}

const startDate = new Date(2020, 1, 1);
const endDate = new Date(2020, 10, 10);

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function recursion_to_generate(timesToBeGenerated: number, allDates: Array<Date>) {
  if (timesToBeGenerated > 0) {
    const date = randomDate(startDate, endDate);
    allDates.push(date);
    recursion_to_generate(timesToBeGenerated - 1, allDates);
  } else {
    return;
  }
}

export async function seed(knex: Knex) {
  const allDates = [] as Array<Date>;
  const all = [] as Array<ITransaction>;
  await recursion_to_generate(200, allDates);

  allDates.forEach(auxdate => {
    const newdate = auxdate.toISOString();
    const avalue = Math.random() * 150 - 50;
    all.push({
      name: 'nothing',
      description: 'nothing',
      date: newdate,
      value: avalue
    });
  });
  await knex('transactions').insert(all);
}
