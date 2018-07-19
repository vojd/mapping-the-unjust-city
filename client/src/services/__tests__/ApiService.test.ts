import { APIService } from '../APIService';

describe('ApiServiceTest', () => {

  describe('sluggify', () => {

    it('replaces swedish characters with lowercase a', () => {
      const apiService = new APIService();
      const str = apiService.sluggify('åäöåäö');
      expect(str).toEqual('aaoaao');
    });

    it('returns a string with all characters as lowercase', () => {
      const apiService = new APIService();
      const str = apiService.sluggify('HELlo');
      expect(str).toEqual('hello');
    });

    it('trims leading and posterior whitespace', () => {
      const apiService = new APIService();
      const str = apiService.sluggify('  hello  ');
      expect(str).toEqual('hello');
    });

    it('replaces spaces in string to hyphens', () => {
      const apiService = new APIService();
      const str = apiService.sluggify('my string should not have spaces');
      expect(str).toEqual('my-string-should-not-have-spaces');
    });

    it('removes characters that are not alphanumerics, underscores or hyphens', () => {
      const apiService = new APIService();
      const str = apiService.sluggify('!@#$hello_there-buddy-123(*&ˆ');
      expect(str).toEqual('hello_there-buddy-123');
    });
  });
});
