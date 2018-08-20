import { slugify } from '../../utils/slugify';

describe('slugify', () => {

  it('replaces swedish characters with lowercase a', () => {
    const str = slugify('åäöåäö');
    expect(str).toEqual('aaoaao');
  });

  it('returns a string with all characters as lowercase', () => {
    const str = slugify('HELlo');
    expect(str).toEqual('hello');
  });

  it('trims leading and posterior whitespace', () => {
    const str = slugify('  hello  ');
    expect(str).toEqual('hello');
  });

  it('replaces spaces in string to hyphens', () => {
    const str = slugify('my string should not have spaces');
    expect(str).toEqual('my-string-should-not-have-spaces');
  });

  it('removes characters that are not alphanumerics, underscores or hyphens', () => {
    const str = slugify('!@#$hello_there-buddy-123(*&ˆ');
    expect(str).toEqual('hello_there-buddy-123');
  });
});
